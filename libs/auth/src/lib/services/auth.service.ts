import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import type { User } from '../models/auth.model';
import { TokenService } from './token.service';
import { UserService } from './user.service';
import type {
  ApiLoginRequest,
  ApiLoginResponse,
} from '@angular-advanced/server-types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenService = inject(TokenService);
  private userService = inject(UserService);
  private http = inject(HttpClient);

  isAuthenticated$ = this.userService.user$.pipe(
    map((user) => user !== undefined),
  );

  login(username: string, password: string): Observable<User> {
    return this.http
      .post<ApiLoginResponse>('/api/auth/login', {
        username,
        password,
      } satisfies ApiLoginRequest)
      .pipe(
        tap((response) => {
          this.tokenService.setTokens(response);
          this.userService.set(response.user);
        }),
        map((response) => response.user),
        catchError(this.handleError),
      );
  }

  logout(): Observable<void> {
    const refreshToken = this.tokenService.getRefreshToken();
    this.tokenService.clearTokens();
    this.userService.clear();

    if (refreshToken) {
      return this.http
        .post<void>('/api/auth/logout', { refreshToken })
        .pipe(catchError(this.handleError));
    }
    return of(undefined);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Client error:', error.error.message);
    } else {
      console.error(
        `Backend error: ${error.status}, ` +
          `body: ${JSON.stringify(error.error)}`,
      );
    }
    return throwError(() => error);
  }
}
