import { inject, Injectable } from '@angular/core';
import { User } from '../models/auth.model';
import { BehaviorSubject } from 'rxjs';
import { STORAGE } from '@angular-advanced/storage';

const USER_KEY = 'user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private storage = inject(STORAGE);
  private userSubject = new BehaviorSubject<User | undefined>(this.get());
  user$ = this.userSubject.asObservable();

  get(): User {
    const userStr = this.storage.get(USER_KEY);
    return userStr ? JSON.parse(userStr) : undefined;
  }

  set(user: User): void {
    this.storage.set(USER_KEY, JSON.stringify(user));
    this.userSubject.next(user);
  }

  clear(): void {
    this.storage.remove(USER_KEY);
    this.userSubject.next(undefined);
  }
}
