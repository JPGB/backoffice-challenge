import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { AuthConfig, provideOAuthClient } from 'angular-oauth2-oidc';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  redirectUri: window.location.origin,
  clientId: '399892398115-kv9evet6724cki29f7061fh43kpiq0cv.apps.googleusercontent.com',
  strictDiscoveryDocumentValidation: false,
  scope: 'openid profile email',
  showDebugInformation: true,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideOAuthClient(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
  ]
};
