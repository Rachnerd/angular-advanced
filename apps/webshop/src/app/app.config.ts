import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor, provideAuth } from '@angular-advanced/auth';
import { LocalStorage, provideStorage } from '@angular-advanced/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(
      withInterceptors([
        // authInterceptor({
        //   whitelist: ['/api/products'],
        //   routes: {
        //     login: ['login'],
        //     forbidden: ['forbidden'],
        //   },
        // }),
      ]),
    ),
    provideStorage(LocalStorage),
    provideAuth({
      routes: {
        login: 'login',
        forbidden: 'forbidden',
      },
    }),
  ],
};
