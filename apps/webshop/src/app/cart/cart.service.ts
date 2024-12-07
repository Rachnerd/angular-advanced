import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { ApiCart, ApiCartProducts } from '@angular-advanced/server-types';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);
  private cartSubject = new ReplaySubject<ApiCartProducts>(1);
  cart$ = this.cartSubject.asObservable();

  get(): void {
    this.http
      .get<ApiCartProducts>('/api/cart/products')
      .subscribe((res) => this.cartSubject.next(res));
  }

  post(productId: string, quantity: number): void {
    this.http
      .post<ApiCartProducts>('/api/cart/products', { productId, quantity })
      .subscribe(() => this.get());
  }

  delete(id: string): void {
    this.http
      .delete<void>(`/api/cart/products/${id}`)
      .subscribe(() => this.get());
  }

  update(id: string, quantity: number): void {
    this.http
      .patch<void>(`/api/cart/products/${id}`, {
        quantity,
      })
      .subscribe(() => this.get());
  }
}
