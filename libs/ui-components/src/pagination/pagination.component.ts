import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'ui-pagination',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  currentPage = input.required<number>();
  totalPages = input.required<number>();
  hasNextPage = input.required<boolean>();
  hasPrevPage = input.required<boolean>();

  pageChange = output<'next' | 'prev'>();
}
