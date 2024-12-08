import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToasterSmartComponent } from './toaster.component';

describe('ToasterSmartComponent', () => {
  let component: ToasterSmartComponent;
  let fixture: ComponentFixture<ToasterSmartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToasterSmartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToasterSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
