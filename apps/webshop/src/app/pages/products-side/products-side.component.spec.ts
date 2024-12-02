import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsSidePageComponent } from './products-side.component';

describe('ProductsSidePageComponent', () => {
  let component: ProductsSidePageComponent;
  let fixture: ComponentFixture<ProductsSidePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsSidePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsSidePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
