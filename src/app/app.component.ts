import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { AuthService, User } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Scrap Inventory System';
  showNavbar = false;
  currentSection: 'plasma' | 'saw' | null = null;
  currentUser: User | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    // Subscribe to currentUser changes
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

    // Listen to route changes to show/hide navbar and detect section
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.url;

      // Hide navbar on home page and login page, show it on all other routes
      this.showNavbar = url !== '/' && url !== '/login';

      // Detect which section we're in
      if (url.startsWith('/plasma')) {
        this.currentSection = 'plasma';
      } else if (url.startsWith('/saw')) {
        this.currentSection = 'saw';
      } else {
        this.currentSection = null;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}