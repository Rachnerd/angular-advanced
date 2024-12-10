import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../products/product.service';
import { ApiPaginationQuery } from '@angular-advanced/server-types';
import { PaginationControlsComponent } from '@angular-advanced/ui-components/pagination-controls/pagination-controls.component';
import { ActivatedRoute, Router } from '@angular/router';

interface SortOptions {
  value: ApiPaginationQuery['sort'];
  label: string;
}

interface OrderOptions {
  value: ApiPaginationQuery['order'];
  label: string;
}

@Component({
  selector: 'app-pagination-controls-smart',
  standalone: true,
  imports: [CommonModule, PaginationControlsComponent],
  templateUrl: './pagination-controls-smart.component.html',
  styleUrl: './pagination-controls-smart.component.scss',
})
export class PaginationControlsSmartComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  protected queryParams = this.productService.queryParams;

  protected readonly sortOptions: SortOptions[] = [
    { value: 'title', label: 'Title' },
    { value: 'price', label: 'Price' },
  ];

  protected readonly orderOptions: OrderOptions[] = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
  ];

  constructor() {
    const { page, ...rest } = this.route.snapshot.queryParams;
    this.productService.updateParams({
      page: Number(page) || 1,
      ...rest,
    });
    effect(() => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: this.queryParams(),
        queryParamsHandling: 'merge',
      });
    });
  }

  updateParams(params: Partial<ApiPaginationQuery>) {
    this.productService.updateParams(params);
  }

  /**
   * The ui-component is not aware of strongly typed string literals coming from
   * the Api. The following methods cast strings to the expected server types.
   * SortOptions makes this cast safe.
   */
  updateSort(sort: string) {
    this.updateParams({
      sort: sort as ApiPaginationQuery['sort'],
    });
  }

  /**
   * OrderOptions makes this cast safe.
   */
  updateOrder(order: string) {
    this.updateParams({
      order: order as ApiPaginationQuery['order'],
    });
  }
}