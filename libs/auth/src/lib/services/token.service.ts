import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { STORAGE } from '@angular-advanced/storage';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly tokenRefreshThreshold = 60; // seconds
  private storage = inject(STORAGE);

  getAccessToken(): string | undefined {
    return this.storage.get(ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | undefined {
    return this.storage.get(REFRESH_TOKEN_KEY) ?? undefined;
  }

  setTokens({
    accessToken,
    refreshToken,
  }: Record<'accessToken' | 'refreshToken', string>): void {
    this.storage.set(ACCESS_TOKEN_KEY, accessToken);
    this.storage.set(REFRESH_TOKEN_KEY, refreshToken);
  }

  clearTokens(): void {
    this.storage.remove(ACCESS_TOKEN_KEY);
    this.storage.remove(REFRESH_TOKEN_KEY);
  }

  isExpired(token: string): boolean {
    const { exp } = jwtDecode(token);
    if (!exp) {
      throw Error('Invalid token');
    }
    return exp - Math.floor(Date.now() / 1000) < this.tokenRefreshThreshold;
  }
}
