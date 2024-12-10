import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../products/product.service';
import { ApiPaginationQuery } from '@angular-advanced/server-types';
import { PaginationComponent } from '@angular-advanced/ui-components/pagination/pagination.component';

@Component({
  selector: 'app-pagination-smart',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './pagination-smart.component.html',
  styleUrl: './pagination-smart.component.scss',
})
export class PaginationSmartComponent {
  private productService = inject(ProductService);
  protected productsResponse = this.productService.productsResponse;
  protected queryParams = this.productService.queryParams;

  updateParams(params: Partial<ApiPaginationQuery>) {
    this.productService.updateParams(params);
  }
}
