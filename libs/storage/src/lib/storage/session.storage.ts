import { Storage } from './storage.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorage implements Storage {
  set(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }
  get(key: string): string | undefined {
    return sessionStorage.getItem(key) ?? undefined;
  }
  remove(key: string): void {
    sessionStorage.removeItem(key);
  }
  clear() {
    sessionStorage.clear();
  }
}
