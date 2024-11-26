import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

type Star = 0 | 0.25 | 0.5 | 0.75 | 1;

@Component({
  selector: 'ui-rating',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingComponent {
  rating = input.required<number>();
  count = input.required<number>();

  protected stars = computed<Star[]>(
    () =>
      Array(5)
        .fill(0)
        .map((_, i) => {
          const diff = this.rating() - i;

          if (diff <= 0) return 0;
          if (diff >= 1) return 1;

          // Round to nearest 0.25
          if (diff <= 0.25) return 0.25;
          if (diff <= 0.5) return 0.5;
          if (diff <= 0.75) return 0.75;
          return 1;
        }) as Star[]
  );
}
