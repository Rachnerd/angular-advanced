import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsGridSmartComponent } from './products-grid-smart.component';

describe('ProductsGridComponent', () => {
  let component: ProductsGridSmartComponent;
  let fixture: ComponentFixture<ProductsGridSmartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsGridSmartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsGridSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
