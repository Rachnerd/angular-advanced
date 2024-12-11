import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgeComponent, BadgeVariant } from './badge.component';
import { Component } from '@angular/core';

// Test host component to test content projection
@Component({
  template: '<ui-badge [variant]="variant">Test Content</ui-badge>',
  standalone: true,
  imports: [BadgeComponent],
})
class TestHostComponent {
  variant: BadgeVariant = 'primary';
}

describe('BadgeComponent', () => {
  let component: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeComponent],
    }).compileComponents();

    // Create both the standalone component and host component fixtures
    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have primary variant by default', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.badge');
    expect(element.classList.contains('primary')).toBeTruthy();
  });

  it('should project content correctly', () => {
    hostFixture.detectChanges();
    const element = hostFixture.nativeElement.querySelector('ui-badge');
    expect(element.textContent.trim()).toBe('Test Content');
  });

  it('should update variant class when host component changes variant', () => {
    hostComponent.variant = 'secondary';
    hostFixture.detectChanges();
    const element = hostFixture.nativeElement.querySelector('ui-badge span');
    expect(element.classList.contains('secondary')).toBeTruthy();
  });

  it('should handle multiple variant changes', () => {
    const element = hostFixture.nativeElement.querySelector('ui-badge span');

    // Test sequence of changes
    const variantSequence: BadgeVariant[] = ['secondary', 'neutral', 'primary'];

    variantSequence.forEach((variant) => {
      hostComponent.variant = variant;
      hostFixture.detectChanges();
      expect(element.classList.contains(variant)).toBeTruthy();
    });
  });
});
