import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationSmartComponent } from './pagination-smart.component';

describe('PaginationSmartComponent', () => {
  let component: PaginationSmartComponent;
  let fixture: ComponentFixture<PaginationSmartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationSmartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
