import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiProduct } from '@angular-advanced/server-types';
import { GridComponent } from '@angular-advanced/ui-components/grid/grid.component';
import { ProductComponent } from '@angular-advanced/ui-components/product/product.component';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products-grid-smart',
  standalone: true,
  imports: [CommonModule, GridComponent, ProductComponent],
  templateUrl: './products-grid-smart.component.html',
  styleUrl: './products-grid-smart.component.scss',
})
export class ProductsGridSmartComponent {
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  products = computed(() => this.productService.productsResponse()?.data ?? []);

  addToCart(product: ApiProduct) {
    this.cartService.post(product.id + '', 1);
  }
}
