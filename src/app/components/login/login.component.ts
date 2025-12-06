import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  error = '';
  returnUrl = '/';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Redirect to home if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }

    // Get return url from query params or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    if (!this.username || !this.password) {
      this.error = 'Please enter username and password';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.loading = false;
        this.router.navigate([this.returnUrl]);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Login failed. Please check your credentials.';
      }
    });
  }
}
