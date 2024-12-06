import {
  HttpInterceptorFn,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { switchMap, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';

export type ApiUrl<T extends string = string> = `/api/${T}`;

const AUTH_WHITELIST: ApiUrl[] = [
  '/api/auth/login',
  '/api/auth/logout',
] as const;

interface AuthInterceptorConfig {
  whitelist: ApiUrl[];
}

export const authInterceptor =
  ({ whitelist }: AuthInterceptorConfig): HttpInterceptorFn =>
  (request, next) => {
    const tokenService = inject(TokenService);
    const authService = inject(AuthService);

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
      return authService.logout().pipe(
        switchMap(() => {
          return throwError(
            () =>
              new HttpErrorResponse({
                error: new Error(
                  'Auth Interceptor: Tried to perform protected API call without authentication',
                ),
                status: HttpStatusCode.Unauthorized,
                statusText: 'Unauthorized',
                url: request.urlWithParams,
              }),
          );
        }),
      );
    }

    const authenticatedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next(authenticatedRequest);
  };
