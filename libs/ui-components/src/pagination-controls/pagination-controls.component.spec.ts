import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationControlsComponent } from './pagination-controls.component';

describe('PaginationControlsComponent', () => {
  let component: PaginationControlsComponent;
  let fixture: ComponentFixture<PaginationControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationControlsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationControlsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('sortOptions', []);
    fixture.componentRef.setInput('orderOptions', []);
    fixture.componentRef.setInput('pageSizes', []);
    fixture.componentRef.setInput('currentSort', 'title');
    fixture.componentRef.setInput('currentOrder', 'asc');
    fixture.componentRef.setInput('currentPageSize', 3);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
