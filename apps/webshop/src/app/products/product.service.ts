import { effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type {
  ApiPaginatedResponse,
  ApiProduct,
  ApiProductSearchQueryType,
} from '@angular-advanced/server-types';
import { createHttpParams } from '../shared/http-params.util';
import { Required } from '@angular-advanced/ui-components/input/input.component.stories';

export type ProductSearchQuery = Pick<
  Required<ApiProductSearchQueryType>,
  'sortBy' | 'sortOrder' | 'page' | 'limit' | 'search'
>;

const PAGINATION_QUERY: ProductSearchQuery = {
  page: 1,
  limit: 3,
  sortBy: 'title',
  sortOrder: 'asc',
  search: '',
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private productsResponseSignal = signal<
    ApiPaginatedResponse<ApiProduct> | undefined
  >(undefined);
  private queryParamsSignal = signal<ProductSearchQuery>(PAGINATION_QUERY);
  readonly productsResponse = this.productsResponseSignal.asReadonly();
  readonly queryParams = this.queryParamsSignal.asReadonly();

  constructor() {
    effect(() => {
      this.fetchProducts().subscribe((res) =>
        this.productsResponseSignal.set(res),
      );
    });
  }

  updateParams(params: Partial<ProductSearchQuery>) {
    this.queryParamsSignal.update((current) => ({
      ...current,
      ...params,
    }));
  }

  private fetchProducts() {
    return this.http.get<ApiPaginatedResponse<ApiProduct>>(`/api/products`, {
      params: createHttpParams(this.queryParamsSignal()),
    });
  }
}
