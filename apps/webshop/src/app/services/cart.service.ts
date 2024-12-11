import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, map } from 'rxjs';
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

type CartState = ApiCartProducts & { productIds: string[] };

const INITIAL_STATE: CartState = {
  products: [],
  productIds: [],
  total: 0,
};

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);
  private cartSubject = new BehaviorSubject<CartState>(INITIAL_STATE);
  cart$ = this.cartSubject.asObservable();
  cartCount$ = this.cart$.pipe(map(({ productIds }) => productIds.length));

  private get cart() {
    return this.cartSubject.getValue();
  }

  /**
   * Endpoint returns the cart with product ids.
   */
  async getCartCount(): Promise<void> {
    const { entries } = await firstValueFrom(
      this.http.get<ApiCart>(API_ENDPOINTS.cart),
    );
    this.updateCartState({
      productIds: entries.map((entry) => entry.productId),
    });
  }

  /**
   * Endpoint returns the cart with fully resolved products.
   */
  async get(): Promise<void> {
    const cart = await firstValueFrom(
      this.http.get<ApiCartProducts>(API_ENDPOINTS.products),
    );
    this.updateCartState({
      ...cart,
      productIds: cart.products.map(({ product }) => product.id),
    });
  }

  async post(productId: string, quantity: number): Promise<void> {
    await firstValueFrom(
      this.http.post<ApiCartProducts>(API_ENDPOINTS.products, {
        productId,
        quantity,
      }),
    );
    const inCart =
      this.cart.productIds.find((id) => id === productId) !== undefined;
    if (!inCart) {
      this.updateCartState({
        productIds: [...this.cart.productIds, productId],
      });
    }
  }

  async delete(id: string): Promise<void> {
    await firstValueFrom(
      this.http.delete<void>(`${API_ENDPOINTS.products}/${id}`),
    );
    const products = this.cart.products.filter(
      ({ product }) => product.id !== id,
    );
    this.updateCartState({
      products,
      productIds: products.map(({ product }) => product.id),
    });
    // No need to get total price if cart is empty
    if (products.length !== 0) {
      await this.getTotalPrice();
    } else {
      this.updateCartState({
        total: 0,
      });
    }
  }

  async update(id: string, quantity: number): Promise<void> {
    const updated = await firstValueFrom(
      this.http.patch<ApiCartProduct>(`${API_ENDPOINTS.products}/${id}`, {
        quantity,
      }),
    );
    this.updateCartState({
      products: this.cart.products.map((entry) =>
        entry.product.id === id ? updated : entry,
      ),
    });
    await this.getTotalPrice();
  }

  private async getTotalPrice(): Promise<void> {
    const total = await firstValueFrom(
      this.http.get<number>(API_ENDPOINTS.total),
    );
    this.updateCartState({ total });
  }

  private updateCartState(newState: Partial<CartState>): void {
    this.cartSubject.next({
      ...this.cart,
      ...newState,
    });
  }
}
