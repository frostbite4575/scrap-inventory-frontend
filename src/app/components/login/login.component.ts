import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  loading = false;
  error = '';
  returnUrl = '/';
  waking = false;
  serverAwake = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    // Redirect to home if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }

    // Get return url from query params or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnInit() {
    // Auto-wake the server when component loads
    this.wakeServer();
  }

  wakeServer() {
    this.waking = true;
    this.error = '';
    this.serverAwake = false;

    // Try to wake the server with retries
    this.pingServerWithRetry(0);
  }

  private pingServerWithRetry(attempt: number) {
    const maxAttempts = 12; // 12 attempts = ~60 seconds
    const backendUrl = environment.apiUrl.replace('/api', '');

    this.http.get(backendUrl).subscribe({
      next: () => {
        this.waking = false;
        this.serverAwake = true;
        console.log('✅ Server is awake!');
      },
      error: (err) => {
        console.log(`Ping attempt ${attempt + 1}/${maxAttempts}, status: ${err.status}`);

        // If we got any HTTP response (even an error), server is awake
        if (err.status !== 0) {
          this.waking = false;
          this.serverAwake = true;
          console.log('✅ Server is awake (responded with error)!');
        } else if (attempt < maxAttempts - 1) {
          // No response yet, retry after 5 seconds
          setTimeout(() => {
            this.pingServerWithRetry(attempt + 1);
          }, 5000);
        } else {
          // Max attempts reached
          this.waking = false;
          this.error = 'Server is taking longer than expected to wake up. Please click "Wake Up Server" to try again.';
        }
      }
    });
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
