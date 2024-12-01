import type { Provider } from '@angular/core';
import { AUTH_CONFIG } from './config/auth.token';
import { AuthConfig } from './config/auth.config';

export const provideAuth = (config: AuthConfig): Provider => ({
  provide: AUTH_CONFIG,
  useValue: config,
});
