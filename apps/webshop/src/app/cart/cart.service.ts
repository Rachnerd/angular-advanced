import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import {
  ApiCart,
  ApiCartProduct,
  ApiCartProducts,
} from '@angular-advanced/server-types';

const API_ENDPOINTS = {
  cart: '/api/cart',
  products: '/api/cart/products',
  total: '/api/cart/total',
} as const;

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);

  /**
   * Endpoint returns the cart with product ids.
   */
  getCartCount(): Observable<ApiCart> {
    return this.http.get<ApiCart>(API_ENDPOINTS.cart);
  }

  /**
   * Endpoint returns the cart with fully resolved products.
   */
  get(): Observable<ApiCartProducts> {
    return this.http.get<ApiCartProducts>(API_ENDPOINTS.products);
  }

  post(productId: string, quantity: number): Observable<void> {
    return this.http.post<void>(API_ENDPOINTS.products, {
      productId,
      quantity,
    });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${API_ENDPOINTS.products}/${id}`);
  }

  update(id: string, quantity: number): Observable<ApiCartProduct> {
    return this.http.patch<ApiCartProduct>(`${API_ENDPOINTS.products}/${id}`, {
      quantity,
    });
  }

  getTotalPrice(): Observable<number> {
    return this.http.get<number>(API_ENDPOINTS.total);
  }
}
