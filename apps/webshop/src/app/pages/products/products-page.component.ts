import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  GridComponent,
  PaginationComponent,
  PaginationControlsComponent,
  ProductComponent,
} from '@angular-advanced/ui-components';

import { createHttpParams } from '../../shared/http-params.util';
import type {
  ApiProduct,
  ApiPaginatedResponse,
  ApiPaginationQuery,
} from '@angular-advanced/server-types';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [
    CommonModule,
    ProductComponent,
    PaginationComponent,
    PaginationControlsComponent,
    GridComponent,
  ],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss',
})
export class ProductsPageComponent {
  http = inject(HttpClient);

  productsResponse = signal<ApiPaginatedResponse<ApiProduct> | undefined>(
    undefined,
  );

  protected queryParams = signal<ApiPaginationQuery>({
    page: 1,
    limit: 3,
    sort: 'id',
    order: 'asc',
  });

  constructor() {
    effect(() => {
      this.fetchProducts().subscribe((res) => this.productsResponse.set(res));
    });
  }

  updateParams(params: Partial<ApiPaginationQuery>) {
    this.queryParams.update((current) => ({
      ...current,
      ...params,
    }));
  }

  private fetchProducts() {
    return this.http.get<ApiPaginatedResponse<ApiProduct>>(`/api/products`, {
      params: createHttpParams(this.queryParams()),
    });
  }
}
