import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GridComponent,
  ProductComponent,
} from '@angular-advanced/ui-components';
import { ApiProduct } from '@angular-advanced/server-types';

@Component({
  selector: 'app-products-grid',
  standalone: true,
  imports: [CommonModule, GridComponent, ProductComponent],
  templateUrl: './products-grid.component.html',
  styleUrl: './products-grid.component.scss',
})
export class ProductsGridComponent {
  products = input.required<ApiProduct[]>();
}
