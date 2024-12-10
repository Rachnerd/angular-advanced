import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsGridSmartComponent } from '../../smart-components/products-grid/products-grid-smart.component';
import { SidebarTemplateComponent } from '@angular-advanced/ui-components/sidebar-template/sidebar-template.component';
import { PaginationControlsSmartComponent } from '../../smart-components/pagination-controls/pagination-controls-smart.component';
import { PaginationSmartComponent } from '../../smart-components/pagination/pagination-smart.component';
import { ProductsSearchComponent } from '../../smart-components/products-search/products-search.component';

@Component({
  selector: 'app-products-side-page',
  standalone: true,
  imports: [
    CommonModule,
    SidebarTemplateComponent,
    ProductsGridSmartComponent,
    PaginationControlsSmartComponent,
    PaginationSmartComponent,
    ProductsSearchComponent,
  ],
  templateUrl: './products-side.component.html',
  styleUrl: './products-side.component.scss',
})
export class ProductsSidePageComponent {}
