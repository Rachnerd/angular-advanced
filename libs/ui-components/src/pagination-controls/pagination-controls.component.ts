import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface SortOption {
  value: string;
  label: string;
}

@Component({
  selector: 'ui-pagination-controls',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagination-controls.component.html',
  styleUrl: './pagination-controls.component.scss',
})
export class PaginationControlsComponent {
  sortOptions = input<SortOption[]>([]);
  pageSizes = input<number[]>([]);

  currentSort = input.required<string>();
  currentOrder = input.required<'asc' | 'desc'>();
  currentPageSize = input.required<number>();

  sortChange = output<string>();
  orderChange = output<'asc' | 'desc'>();
  pageSizeChange = output<number>();

  emitPageSize(page: string) {
    this.pageSizeChange.emit(parseInt(page));
  }
}
