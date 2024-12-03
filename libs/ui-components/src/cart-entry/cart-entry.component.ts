import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';
import { RatingComponent } from '../rating/rating.component';
import { Product } from '../product/product.component';
import { ButtonComponent } from '../button/button.component';

export interface CartEntry {
  quantity: number;
  total: number;
}

@Component({
  selector: 'ui-cart-entry',
  standalone: true,
  imports: [CommonModule, ThumbnailComponent, RatingComponent, ButtonComponent],
  templateUrl: './cart-entry.component.html',
  styleUrl: './cart-entry.component.scss',
})
export class CartEntryComponent {
  entry = input.required<CartEntry>();
  product = input.required<Product>();
  remove = output<void>();
  add = output<-1 | 1>();
}
