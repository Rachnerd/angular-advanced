import { effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type {
  ApiPaginatedResponse,
  ApiPaginationQuery,
  ApiProduct,
} from '@angular-advanced/server-types';
import { createHttpParams } from '../shared/http-params.util';

const PAGINATION_QUERY: ApiPaginationQuery = {
  page: 1,
  limit: 3,
  sort: 'id',
  order: 'asc',
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private productsResponseSignal = signal<
    ApiPaginatedResponse<ApiProduct> | undefined
  >(undefined);
  private queryParamsSignal = signal<ApiPaginationQuery>(PAGINATION_QUERY);
  readonly productsResponse = this.productsResponseSignal.asReadonly();
  readonly queryParams = this.queryParamsSignal.asReadonly();

  constructor() {
    effect(() => {
      this.fetchProducts().subscribe((res) =>
        this.productsResponseSignal.set(res),
      );
    });
  }

  updateParams(params: Partial<ApiPaginationQuery>) {
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
