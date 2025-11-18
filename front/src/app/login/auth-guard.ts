import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from './auth-service';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.isAuthenticated();

  console.warn({ isAuthenticated });


  if (!isAuthenticated) {
    const { username, password }: { username: string, password: string } = JSON.parse(localStorage.getItem("login") || '{"username":"","password":""}')

    if (username !== "admin" || password !== "admin") {
    } else {
      return true;
    }
  }

  return true;
};
