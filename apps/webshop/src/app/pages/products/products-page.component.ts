import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { ApiPaginationQuery } from '@angular-advanced/server-types';
import { ProductsGridComponent } from '../../products/grid/products-grid.component';
import { ProductService } from '../../products/product.service';
import { PaginationComponent } from '@angular-advanced/ui-components/pagination/pagination.component';
import { PaginationControlsComponent } from '@angular-advanced/ui-components/pagination-controls/pagination-controls.component';
import { MainTemplateComponent } from '@angular-advanced/ui-components/main-template/main-template.component';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [
    CommonModule,
    PaginationComponent,
    PaginationControlsComponent,
    MainTemplateComponent,
    ProductsGridComponent,
  ],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss',
})
export class ProductsPageComponent {
  private productService = inject(ProductService);
  protected productsResponse = this.productService.productsResponse;
  protected queryParams = this.productService.queryParams;

  updateParams(params: Partial<ApiPaginationQuery>) {
    this.productService.updateParams(params);
  }
}
