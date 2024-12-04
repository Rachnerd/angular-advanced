import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { ApiPaginationQuery } from '@angular-advanced/server-types';
import { ProductsGridComponent } from '../../products/grid/products-grid.component';
import { ProductService } from '../../products/product.service';
import { SidebarTemplateComponent } from '@angular-advanced/ui-components/sidebar-template/sidebar-template.component';
import { PaginationControlsComponent } from '@angular-advanced/ui-components/pagination-controls/pagination-controls.component';
import { PaginationComponent } from '@angular-advanced/ui-components/pagination/pagination.component';

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
