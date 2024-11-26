import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, delay, Observable, of, tap } from 'rxjs';

export interface User {
  id: number;
  email: string;
  name: string;
  token: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly STORAGE_KEY = 'auth_user';

  private currentUserSubject: BehaviorSubject<User | undefined>;
  currentUser$: Observable<User | undefined>;

  constructor(private http: HttpClient) {
    const storedUser = sessionStorage.getItem(this.STORAGE_KEY);
    this.currentUserSubject = new BehaviorSubject<User | undefined>(
      storedUser ? JSON.parse(storedUser) : undefined,
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  /**
   * TODO: Real endpoint
   */
  login(): Observable<User> {
    return of<User>({
      id: 1,
      email: 'test@gmail.com',
      name: 'John',
      token: 'Doe',
    }).pipe(
      delay(400),
      tap((user) => {
        sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
        this.currentUserSubject.next(user);
      }),
    );
  }

  logout(): void {
    sessionStorage.removeItem(this.STORAGE_KEY);
    this.currentUserSubject.next(undefined);
  }
}
