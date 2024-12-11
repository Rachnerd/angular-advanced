import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsGridSmartComponent } from '../../smart-components/products-grid/products-grid-smart.component';
import { MainTemplateComponent } from '@angular-advanced/ui-components/main-template/main-template.component';
import { PaginationControlsSmartComponent } from '../../smart-components/pagination-controls/pagination-controls-smart.component';
import { PaginationSmartComponent } from '../../smart-components/pagination/pagination-smart.component';
import { ProductsSearchSmartComponent } from '../../smart-components/products-search/products-search-smart.component';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [
    CommonModule,
    MainTemplateComponent,
    ProductsGridSmartComponent,
    PaginationControlsSmartComponent,
    PaginationSmartComponent,
    ProductsSearchSmartComponent,
  ],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss',
})
export class ProductsPageComponent {}
