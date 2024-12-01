import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, EMPTY, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export type ApiUrl<T extends string = string> = `/api/${T}`;

const AUTH_WHITELIST: ApiUrl[] = [
  '/api/auth/login',
  '/api/auth/logout',
] as const;

interface AuthInterceptorConfig {
  whitelist: ApiUrl[];
  routes: {
    login: string[];
    forbidden: string[];
  };
}

export const authInterceptor =
  ({ routes, whitelist }: AuthInterceptorConfig): HttpInterceptorFn =>
  (request, next) => {
    const tokenService = inject(TokenService);
    const authService = inject(AuthService);
    const router = inject(Router);

    // Skip authentication for unprotected URLs
    if (
      [...AUTH_WHITELIST, ...whitelist].some((url) =>
        request.url.endsWith(url),
      ) ||
      !request.url.startsWith('/api/' satisfies ApiUrl)
    ) {
      return next(request);
    }

    const token = tokenService.getAccessToken();

    if (!token || tokenService.isExpired(token)) {
      authService.logout().subscribe({
        complete: () => router.navigate(routes.login),
      });
      return EMPTY;
    }

    const authenticatedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next(authenticatedRequest).pipe(
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          router.navigate(routes.login);
          return EMPTY;
        }
        if (error instanceof HttpErrorResponse && error.status === 403) {
          router.navigate(routes.forbidden);
          return EMPTY;
        }
        return throwError(() => error);
      }),
    );
  };
