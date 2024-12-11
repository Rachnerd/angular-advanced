import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsSearchSmartComponent } from './products-search-smart.component';

describe('ProductsSearchComponent', () => {
  let component: ProductsSearchSmartComponent;
  let fixture: ComponentFixture<ProductsSearchSmartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsSearchSmartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsSearchSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
