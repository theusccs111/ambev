import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopbarComponent } from './components/topbar/topbar.component';
import { ToolBarComponent } from './components/ToolBarComponent/toolbar.component';
import { ToolbarService } from './services/toolbar.service';
import { TokenStorageService } from './services/token.storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NavbarComponent, TopbarComponent, SidebarComponent, RouterOutlet, ToolBarComponent]

})
export class AppComponent implements OnInit, OnChanges {
  title = '.:: SISTEMA ::.';
  isShowSideBar = true;
  toolbarIsVisible: boolean = false
  user: any;

  constructor(private router: Router,
    private toolbarService: ToolbarService,
    private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {

        let activeRoute = event.url;
        if (event.url === '/login') {
          this.isShowSideBar = false;
        } else {
          this.isShowSideBar = true;
        }
      }
    });

    this.toolbarService.onChangeIsVisible.subscribe(value =>
      this.toolbarIsVisible = value
    )
  }

  logout() {
    this.tokenStorageService.signOut();
    this.router.navigate(['/login']);
  }

  onDestroy() {
    this.toolbarService.onChangeIsVisible.unsubscribe()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.user = this.tokenStorageService.getUser();
  }
}
