import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../services/token.storage.service';
import { DemoNgZorroAntdModule } from '../../ng-zorro-antd.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';

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
    NzModalModule
  ]
})
export class NavbarComponent implements OnInit {
  protected username: string = "Nome do usuário";
  protected profile: string = "";
  protected title: string = "";
  protected user: any;
  protected hasNotifications = signal<boolean>(false);

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService,
  ) {
  }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();
    this.username = this.user?.user_name;
  }

  shouldDisplayNavbar(): boolean {
    return !this.router.url.includes('login');
  }

  logout() {
    this.tokenStorageService.signOut();
    this.router.navigate(['/login']);
  }
}
