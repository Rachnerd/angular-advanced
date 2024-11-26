import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

type CardVariant = 'primary' | 'secondary';

@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  variant = input<CardVariant>('primary');
}
