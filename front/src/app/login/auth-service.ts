import { inject, Injectable, signal } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from '../app.config';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  oauthService = inject(OAuthService);
  router = inject(Router);
  httpClient = inject(HttpClient);

  profile = signal({});

  isAuthenticated() {
    return this.oauthService.hasValidAccessToken();
  }

  constructor() {
    this.oauthService.configure(authCodeFlowConfig);

    this.oauthService.setupAutomaticSilentRefresh();

    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(async () => {
      if (this.oauthService.hasValidIdToken()) {
        this.oauthService.loadUserProfile().then(profile => {
          this.profile.set(profile)
        })
      }
    });
  }

  loginWithGoogle() {
    this.oauthService.initImplicitFlow();
  }

  loginWithPassword(username: string, password: string) {
    return this.httpClient.post("http://localhost:8080/users/login", { username, password })
  }

  logout() {
    localStorage.removeItem("login");
    this.oauthService.revokeTokenAndLogout();
    this.router.navigateByUrl("/login");
  }
}
