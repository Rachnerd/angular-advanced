import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ProductCard,
  ProductCardComponent,
} from '../product-card/product-card.component';
import { ButtonComponent } from '../button/button.component';
import { BadgeComponent } from '../badge/badge.component';

type ProductType = 'default' | 'limited' | 'out-of-stock';

interface Product extends ProductCard {
  type: ProductType;
  description: string;
}

@Component({
  selector: 'ui-product',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
    ButtonComponent,
    BadgeComponent,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  product = input.required<Product>();

  addToCart = output<Product>();
}
