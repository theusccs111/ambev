import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, Inject, Input, OnInit, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SCREEN_SAVER, TokenStorageService } from '../../services/token.storage.service';
// import { NotificacaoService } from '../../services/notificacao.service';
import { DemoNgZorroAntdModule } from '../../ng-zorro-antd.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LoginComponent } from '../../pages/login/login.component';
import { debounceTime, Subject, takeWhile } from 'rxjs';
import { NzModalComponent, NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DemoNgZorroAntdModule,
    NzIconModule,
    LoginComponent,
    NzModalModule
  ]
})
export class NavbarComponent implements OnInit {
  protected username: string = "Nome do usuário";
  protected profile: string = "";
  protected title: string = "";
  protected user: any;
  protected hasNotifications = signal<boolean>(false);
  protected isScreenSaverVisible: boolean = false;
  private userActivity!: ReturnType<typeof setTimeout> | number;
  private userInactive$: Subject<any> = new Subject();
  private mouseMoveSubject$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService,
    // private notificationService: NotificacaoService
  ) {
  }

  ngOnInit(): void {
    this.initiateTimeout();
    /** Evitando com que screen saver apareça na tela de login */
    this.userInactive$
      .pipe(
        takeWhile(() => this.router.url !== '/login')
      )
      .subscribe(() => this.abrirScreenSaver());

    this.mouseMoveSubject$
      .pipe(
        debounceTime(500),
      )
      .subscribe(() => this.resetTimer());

    this.user = this.tokenStorageService.getUser();
    this.username = this.user?.user_name;
    this.profile = this.tokenStorageService.getProfile()?.name;
    this.checkForNotifications();
  }

  ngAfterViewInit(): void {
    if (this.tokenStorageService.getItem('screen-saver')) {
      this.isScreenSaverVisible = true;
    }
  }

  shouldDisplayNavbar(): boolean {
    return !this.router.url.includes('login');
  }

  logout() {
    this.tokenStorageService.signOut();
    this.router.navigate(['/login']);
  }

  goToNotifications() {
    this.router.navigate(['/gerenciamento/notificacoes']);
  }

  checkForNotifications() {
    // this.notificationService.alert().subscribe((res) => {
    //   if (res.success) {
    //     this.hasNotifications.set(res.data?.has_notifications);
    //   } else {
    //     this.hasNotifications.set(false);
    //   }
    // }, (error: any) => { 
    //   this.hasNotifications.set(false);
    // })
  }

  protected abrirScreenSaver(): void {
    this.isScreenSaverVisible = true;
    this.tokenStorageService.setItem(SCREEN_SAVER, 'true')
  }

  /** Setando timer de 5 minutos */
  private initiateTimeout(): void {
    this.userActivity = setTimeout(
      () => this.userInactive$.next(undefined), 300000
    )
  }

  /** Emitindo valor ao subscriber no onInit */
  @HostListener('window:mousemove')
  private detectCursorMovement(): void {
    this.mouseMoveSubject$.next();
  }

  private resetTimer(): void {
    clearTimeout(this.userActivity);
    this.initiateTimeout();
  }
}
