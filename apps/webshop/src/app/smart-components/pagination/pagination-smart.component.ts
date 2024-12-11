import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '@angular-advanced/ui-components/pagination/pagination.component';
import { ApiProductSearchQueryType } from '@angular-advanced/server-types';
import { ProductService } from '../../services/product.service';

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

  updateParams(params: Partial<ApiProductSearchQueryType>) {
    this.productService.updateParams(params);
  }
}
