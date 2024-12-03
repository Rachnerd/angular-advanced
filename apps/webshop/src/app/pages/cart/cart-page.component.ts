import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CartEntryComponent,
  Product,
  SidebarTemplateComponent,
} from '@angular-advanced/ui-components';
import { CartService } from '../../cart/cart.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, SidebarTemplateComponent, CartEntryComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent implements OnInit {
  private cartService = inject(CartService);

  cart = toSignal(this.cartService.cart$);

  ngOnInit() {
    this.cartService.get();
  }

  remove(product: Product) {
    this.cartService.delete(product.id);
  }

  update(product: Product, quantity: number) {
    this.cartService.update(product.id, quantity);
  }
}
