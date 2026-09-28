import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.authService.isLoggedIn = true;
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.http.post("https://localhost:7170/api/Login/login",
      { username, password },
      { responseType: 'text' })
      .subscribe({
        next: (data: any) => {
          console.log("Token received:", data);
          this.tokenStorage.saveToken(data);
          this.tokenStorage.saveUser(1);
          this.router.navigate(['/']);
          window.location.reload();
        },
        error: (err) => {
          console.error("Login failed:", err);
          alert("Invalid credentials.");
        }
      });
  }
}