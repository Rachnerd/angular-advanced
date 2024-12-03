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
import { ProductService } from '../../products/product.service';

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
  private productService = inject(ProductService);
  protected productsResponse = this.productService.productsResponse;
  protected queryParams = this.productService.queryParams;

  updateParams(params: Partial<ApiPaginationQuery>) {
    this.productService.updateParams(params);
  }
}
