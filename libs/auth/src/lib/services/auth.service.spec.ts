import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { UserService } from './user.service';
import { of, Subject, throwError } from 'rxjs';
import type { User } from '../models/auth.model';
import type { ApiLoginResponse } from '@angular-advanced/server-types';

jest.mock('@angular/common/http');

describe('AuthService', () => {
  let service: AuthService;
  let httpClient: jest.Mocked<HttpClient>;
  let tokenService: jest.Mocked<TokenService>;
  let userService: jest.Mocked<UserService>;
  let mockUserSubject: Subject<User | undefined>;

  const mockUser: User = {
    id: '1',
    name: 'test@example.com',
    role: 'user',
  };

  const mockLoginResponse: ApiLoginResponse = {
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token',
    user: mockUser,
    expiresIn: '10d',
    tokenType: 'Bearer',
  };

  beforeEach(() => {
    mockUserSubject = new Subject<User | undefined>();

    const tokenServiceMock = {
      setTokens: jest.fn(),
      getRefreshToken: jest.fn(),
      clearTokens: jest.fn(),
    };

    const userServiceMock = {
      set: jest.fn(),
      clear: jest.fn(),
      user$: mockUserSubject.asObservable(), // Set this up before service creation
    };

    const httpClientMock = {
      post: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: TokenService, useValue: tokenServiceMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: HttpClient, useValue: httpClientMock },
      ],
    });

    service = TestBed.inject(AuthService);
    httpClient = TestBed.inject(HttpClient) as jest.Mocked<HttpClient>;
    tokenService = TestBed.inject(TokenService) as jest.Mocked<TokenService>;
    userService = TestBed.inject(UserService) as jest.Mocked<UserService>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isAuthenticated$', () => {
    it('should emit false when user is undefined', (done) => {
      service.isAuthenticated$.subscribe((isAuth) => {
        expect(isAuth).toBe(false);
        done();
      });
      mockUserSubject.next(undefined);
    });

    it('should emit true when user is defined', (done) => {
      service.isAuthenticated$.subscribe((isAuth) => {
        expect(isAuth).toBe(true);
        done();
      });
      mockUserSubject.next(mockUser);
    });
  });

  describe('login', () => {
    it('should send correct login request and handle successful response', (done) => {
      const username = 'testuser';
      const password = 'password123';

      httpClient.post.mockReturnValue(of(mockLoginResponse));

      service.login(username, password).subscribe({
        next: (user) => {
          expect(user).toEqual(mockUser);
          expect(httpClient.post).toHaveBeenCalledWith('/api/auth/login', {
            username,
            password,
          });
          expect(tokenService.setTokens).toHaveBeenCalledWith(
            mockLoginResponse,
          );
          expect(userService.set).toHaveBeenCalledWith(mockUser);
          done();
        },
      });
    });

    it('should handle login error', (done) => {
      const errorResponse = new HttpErrorResponse({
        error: 'Invalid credentials',
        status: 401,
        statusText: 'Unauthorized',
      });

      httpClient.post.mockReturnValue(throwError(() => errorResponse));

      service.login('wrong', 'credentials').subscribe({
        error: (error) => {
          expect(error).toBeTruthy();
          expect(tokenService.setTokens).not.toHaveBeenCalled();
          expect(userService.set).not.toHaveBeenCalled();
          done();
        },
      });
    });
  });

  describe('logout', () => {
    it('should send logout request when refresh token exists', (done) => {
      const mockRefreshToken = 'mock-refresh-token';
      tokenService.getRefreshToken.mockReturnValue(mockRefreshToken);
      httpClient.post.mockReturnValue(of(null));

      service.logout().subscribe({
        next: () => {
          expect(tokenService.clearTokens).toHaveBeenCalled();
          expect(userService.clear).toHaveBeenCalled();
          expect(httpClient.post).toHaveBeenCalledWith('/api/auth/logout', {
            refreshToken: mockRefreshToken,
          });
          done();
        },
      });
    });

    it('should not send logout request when no refresh token exists', (done) => {
      tokenService.getRefreshToken.mockReturnValue(undefined);

      service.logout().subscribe({
        next: () => {
          expect(tokenService.clearTokens).toHaveBeenCalled();
          expect(userService.clear).toHaveBeenCalled();
          expect(httpClient.post).not.toHaveBeenCalled();
          done();
        },
      });
    });

    it('should handle logout error', (done) => {
      const mockRefreshToken = 'mock-refresh-token';
      tokenService.getRefreshToken.mockReturnValue(mockRefreshToken);

      const errorResponse = new HttpErrorResponse({
        error: 'Logout failed',
        status: 500,
        statusText: 'Internal Server Error',
      });

      httpClient.post.mockReturnValue(throwError(() => errorResponse));

      service.logout().subscribe({
        error: (error) => {
          expect(error).toBeTruthy();
          expect(tokenService.clearTokens).toHaveBeenCalled();
          expect(userService.clear).toHaveBeenCalled();
          done();
        },
      });
    });
  });
});
