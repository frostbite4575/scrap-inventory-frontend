import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  username: string = '';
  password: string = '';
  showLogin: boolean = false;

  constructor(private router: Router) {}

  navigateTo(section: 'plasma' | 'saw') {
    // Navigate to the respective dashboard
    this.router.navigate([`/${section}/dashboard`]);
  }

  onLogin() {
    // TODO: Implement actual authentication
    console.log('Login attempt:', this.username);
    // For now, just navigate to plasma dashboard
    this.router.navigate(['/plasma/dashboard']);
  }
}
