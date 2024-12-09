import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiProduct } from '@angular-advanced/server-types';
import { GridComponent } from '@angular-advanced/ui-components/grid/grid.component';
import { ProductComponent } from '@angular-advanced/ui-components/product/product.component';
import { Store } from '@ngrx/store';
import { CartActions } from '../../cart/cart.actions';

@Component({
  selector: 'app-products-grid',
  standalone: true,
  imports: [CommonModule, GridComponent, ProductComponent],
  templateUrl: './products-grid.component.html',
  styleUrl: './products-grid.component.scss',
})
export class ProductsGridComponent {
  products = input.required<ApiProduct[]>();
  private store = inject(Store);

  addToCart(product: ApiProduct) {
    this.store.dispatch(
      CartActions.post({
        id: product.id.toString(),
        quantity: 1,
      }),
    );
  }
}
