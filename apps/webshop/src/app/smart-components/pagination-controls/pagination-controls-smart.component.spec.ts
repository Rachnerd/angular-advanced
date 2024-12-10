import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationControlsSmartComponent } from './pagination-controls-smart.component';

describe('PaginationControlsSmartComponent', () => {
  let component: PaginationControlsSmartComponent;
  let fixture: ComponentFixture<PaginationControlsSmartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationControlsSmartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationControlsSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
