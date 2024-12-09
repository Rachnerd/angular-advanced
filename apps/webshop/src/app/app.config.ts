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
import { ERROR_HANDLER } from './error/error-hander.token';
import { HttpErrorHandler } from './error/handlers/http.error-handler';
import { requestNotificationInterceptor } from './interceptors/request-notification.interceptors';
import { provideState, provideStore } from '@ngrx/store';
import { cartFeature } from './cart/cart.feature';
import { provideEffects } from '@ngrx/effects';
import { CartEffects } from './cart/effects/cart.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(
      withInterceptors([
        authInterceptor({
          whitelist: ['/api/products'],
        }),
        requestNotificationInterceptor,
      ]),
    ),
    provideStorage(LocalStorage),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    {
      provide: ERROR_HANDLER,
      useClass: HttpErrorHandler,
      multi: true,
    },
    provideStore(),
    provideState(cartFeature),
    provideEffects(CartEffects),
  ],
};
