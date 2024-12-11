import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationControlsSmartComponent } from './pagination-controls-smart.component';
import { Component, input } from '@angular/core';
import { PaginationControlsComponent } from '@angular-advanced/ui-components/pagination-controls/pagination-controls.component';
import {
  ProductSearchQuery,
  ProductService,
} from '../../services/product.service';

// Create mock component implementing the same interface
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ui-pagination-controls',
  template: '',
  standalone: true,
})
class MockPaginationControlsComponent
  implements Partial<PaginationControlsComponent>
{
  currentPage = input.required<number>();
  currentOrder = input.required<string>();
  currentSort = input.required<string>();
  currentPageSize = input.required<number>();
  pageSize = input.required<number>();
  pageSizes = input.required<number[]>();
  totalItems = input.required<number>();
  sortBy = input.required<number>();
  sortOptions =
    input.required<ReturnType<PaginationControlsComponent['sortOptions']>>();
  orderOptions =
    input.required<ReturnType<PaginationControlsComponent['orderOptions']>>();
  // Add any other inputs/outputs from the original component
}

describe('PaginationControlsSmartComponent', () => {
  let component: PaginationControlsSmartComponent;
  let fixture: ComponentFixture<PaginationControlsSmartComponent>;
  let productService: jest.Mocked<ProductService>;
  let router: jest.Mocked<Router>;
  let route: Partial<ActivatedRoute>;

  beforeEach(async () => {
    const mockProductService = {
      queryParams: jest.fn(),
      updateParams: jest.fn(),
    };

    const mockRouter = {
      navigate: jest.fn().mockResolvedValue(true),
    };

    const mockRoute = {
      snapshot: {
        queryParams: {},
      },
    };

    await TestBed.configureTestingModule({
      imports: [PaginationControlsSmartComponent],
      providers: [
        { provide: ProductService, useValue: mockProductService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockRoute },
      ],
    })
      .overrideComponent(PaginationControlsSmartComponent, {
        remove: { imports: [PaginationControlsComponent] },
        add: { imports: [MockPaginationControlsComponent] },
      })
      .compileComponents();

    productService = TestBed.inject(
      ProductService,
    ) as jest.Mocked<ProductService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
    route = TestBed.inject(ActivatedRoute);

    // Mock the signal
    productService.queryParams.mockReturnValue({
      page: 1,
      sortBy: 'title',
      sortOrder: 'asc',
      limit: 3,
      search: '',
    });

    fixture = TestBed.createComponent(PaginationControlsSmartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initialization', () => {
    it('should initialize with default page 1 when no query params', () => {
      fixture.detectChanges();
      expect(productService.updateParams).toHaveBeenCalledWith(
        expect.objectContaining({ page: 1 }),
      );
    });

    it('should initialize with page from query params', () => {
      route.snapshot!.queryParams = { page: '2' };
      fixture = TestBed.createComponent(PaginationControlsSmartComponent);
      fixture.detectChanges();

      expect(productService.updateParams).toHaveBeenCalledWith(
        expect.objectContaining({ page: 2 }),
      );
    });

    it('should initialize with additional query params', () => {
      route.snapshot!.queryParams = {
        page: '2',
        sortBy: 'price',
        sortOrder: 'desc',
      };
      fixture = TestBed.createComponent(PaginationControlsSmartComponent);
      fixture.detectChanges();

      expect(productService.updateParams).toHaveBeenCalledWith({
        page: 2,
        sortBy: 'price',
        sortOrder: 'desc',
      });
    });
  });

  describe('effect', () => {
    it('should navigate with query params when params change', () => {
      const queryParams: ProductSearchQuery = {
        page: 2,
        sortBy: 'price',
        sortOrder: 'desc',
        limit: 3,
        search: '',
      };
      productService.queryParams.mockReturnValue(queryParams);

      fixture.detectChanges();

      expect(router.navigate).toHaveBeenCalledWith([], {
        relativeTo: route,
        queryParams,
        queryParamsHandling: 'merge',
      });
    });
  });

  describe('updateParams', () => {
    it('should call productService.updateParams with provided params', () => {
      const params = { page: 3 };
      component.updateParams(params);
      expect(productService.updateParams).toHaveBeenCalledWith(params);
    });
  });

  describe('updateSort', () => {
    it('should update sortBy parameter', () => {
      component.updateSort('price');
      expect(productService.updateParams).toHaveBeenCalledWith({
        sortBy: 'price',
      });
    });

    it('should handle all defined sort options', () => {
      const sortOptions = component['sortOptions'];
      sortOptions.forEach((option) => {
        component.updateSort(option.value);
        expect(productService.updateParams).toHaveBeenCalledWith({
          sortBy: option.value,
        });
      });
    });
  });

  describe('updateOrder', () => {
    it('should update sortOrder parameter', () => {
      component.updateOrder('desc');
      expect(productService.updateParams).toHaveBeenCalledWith({
        sortOrder: 'desc',
      });
    });

    it('should handle all defined order options', () => {
      const orderOptions = component['orderOptions'];
      orderOptions.forEach((option) => {
        component.updateOrder(option.value);
        expect(productService.updateParams).toHaveBeenCalledWith({
          sortOrder: option.value,
        });
      });
    });
  });

  describe('sort and order options', () => {
    it('should have correct sort options', () => {
      const expectedSortOptions = [
        { value: 'title', label: 'Title' },
        { value: 'price', label: 'Price' },
      ];
      expect(component['sortOptions']).toEqual(expectedSortOptions);
    });

    it('should have correct order options', () => {
      const expectedOrderOptions = [
        { value: 'asc', label: 'Ascending' },
        { value: 'desc', label: 'Descending' },
      ];
      expect(component['orderOptions']).toEqual(expectedOrderOptions);
    });
  });
});
