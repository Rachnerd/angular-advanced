import {
  ApplicationConfig,
  ErrorHandler,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '@angular-advanced/auth';
import { LocalStorage, provideStorage } from '@angular-advanced/storage';
import { GlobalErrorHandler } from './error/global-error-handler.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(
      withInterceptors([
        authInterceptor({
          whitelist: ['/api/products'],
        }),
      ]),
    ),
    provideStorage(LocalStorage),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
  ],
};
