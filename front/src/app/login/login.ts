import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = signal("");
  password = signal("");

  wrongPassword = signal(false);

  authService = inject(AuthService);
  router = inject(Router);

  async onSubmit() {
    this.authService.loginWithPassword(this.username(), this.password()).subscribe({
      next: () => {
        localStorage.setItem("login", JSON.stringify({ username: this.username(), password: this.password() }));
        this.router.navigateByUrl("client/list");
        this.wrongPassword.set(false)
        console.warn("ala");

      },
      error: (error) => {
        console.warn("Login failed", error);
        this.wrongPassword.set(true)
      }
    });
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }
}
