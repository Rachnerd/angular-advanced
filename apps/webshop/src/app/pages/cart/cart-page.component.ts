import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { SidebarTemplateComponent } from '@angular-advanced/ui-components/sidebar-template/sidebar-template.component';
import { CartEntryComponent } from '@angular-advanced/ui-components/cart-entry/cart-entry.component';
import type { Product } from '@angular-advanced/ui-components/product/product.component';
import { Store } from '@ngrx/store';
import { cartFeature } from '../../cart/cart.feature';
import { CartActions } from '../../cart/cart.actions';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, SidebarTemplateComponent, CartEntryComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent implements OnInit {
  private store = inject(Store);
  cart = toSignal(this.store.select(cartFeature.selectCartWithProducts));

  ngOnInit() {
    this.store.dispatch(CartActions.get());
  }

  remove(product: Product) {
    this.store.dispatch(
      CartActions.delete({
        id: product.id,
      }),
    );
  }

  update(product: Product, quantity: number) {
    this.store.dispatch(
      CartActions.patch({
        id: product.id,
        quantity,
      }),
    );
  }
}
