import { Component, computed, contentChild, input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { RatingComponent } from '../rating/rating.component';
import { BadgeComponent } from '../badge/badge.component';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';

export interface ProductCard {
  title: string;
  description: string;
  image: string;
  price: number;
}

@Component({
  selector: 'ui-product-card',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    RatingComponent,
    CurrencyPipe,
    ThumbnailComponent,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  product = input.required<ProductCard>();

  private badge = contentChild(BadgeComponent);
  protected hasBadge = computed(() => this.badge() !== undefined);
}
