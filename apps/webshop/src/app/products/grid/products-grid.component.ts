import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GridComponent,
  ProductComponent,
} from '@angular-advanced/ui-components';
import { ApiProduct } from '@angular-advanced/server-types';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-products-grid',
  standalone: true,
  imports: [CommonModule, GridComponent, ProductComponent],
  templateUrl: './products-grid.component.html',
  styleUrl: './products-grid.component.scss',
})
export class ProductsGridComponent {
  products = input.required<ApiProduct[]>();
  private cartService = inject(CartService);

  addToCart(product: ApiProduct) {
    this.cartService.post(product.id + '', 1);
  }
}
