import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PaginationComponent,
  PaginationControlsComponent,
  SidebarTemplateComponent,
} from '@angular-advanced/ui-components';
import { HttpClient } from '@angular/common/http';
import type {
  ApiPaginatedResponse,
  ApiPaginationQuery,
  ApiProduct,
} from '@angular-advanced/server-types';
import { createHttpParams } from '../../shared/http-params.util';
import { ProductsGridComponent } from '../../products/grid/products-grid.component';

@Component({
  selector: 'app-products-side-page',
  standalone: true,
  imports: [
    CommonModule,
    SidebarTemplateComponent,
    ProductsGridComponent,
    PaginationControlsComponent,
    PaginationComponent,
    PaginationControlsComponent,
  ],
  templateUrl: './products-side.component.html',
  styleUrl: './products-side.component.scss',
})
export class ProductsSidePageComponent {
  private http = inject(HttpClient);

  productsResponse = signal<ApiPaginatedResponse<ApiProduct> | undefined>(
    undefined,
  );

  queryParams = signal<ApiPaginationQuery>({
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
