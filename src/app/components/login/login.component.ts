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

    // Ping the backend root endpoint to wake it up
    const backendUrl = environment.apiUrl.replace('/api', '');

    this.http.get(backendUrl, { observe: 'response' }).subscribe({
      next: () => {
        this.waking = false;
        this.serverAwake = true;
      },
      error: (err) => {
        // Even on error, if we got a response, the server is awake
        if (err.status !== 0) {
          this.waking = false;
          this.serverAwake = true;
        } else {
          this.waking = false;
          this.error = 'Could not reach server. Please check your connection and try again.';
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
