import { Storage } from './storage.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorage implements Storage {
  set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
  get(key: string): string | undefined {
    return localStorage.getItem(key) ?? undefined;
  }
  remove(key: string): void {
    localStorage.removeItem(key);
  }
  clear() {
    localStorage.clear();
  }
}
