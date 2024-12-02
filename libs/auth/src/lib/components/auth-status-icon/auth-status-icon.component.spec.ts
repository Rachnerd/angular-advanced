import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthStatusIconComponent } from './auth-status-icon.component';

describe('AuthStatusIconComponent', () => {
  let component: AuthStatusIconComponent;
  let fixture: ComponentFixture<AuthStatusIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthStatusIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthStatusIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
