import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent, ButtonVariant } from './button.component';
import { Component } from '@angular/core';

// Test host component
@Component({
  template: `
    <ui-button
      [variant]="variant"
      [type]="type"
      [disabled]="disabled"
      [disabledMessage]="disabledMessage"
      [loading]="loading"
      (click)="handleClick()"
    >
      Button Text
    </ui-button>
  `,
  standalone: true,
  imports: [ButtonComponent],
})
class TestHostComponent {
  variant: ButtonVariant = 'primary';
  type: 'button' | 'submit' | 'reset' = 'button';
  disabled = false;
  disabledMessage?: string;
  loading = false;
  clickCount = 0;

  handleClick() {
    this.clickCount++;
  }
}

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input properties', () => {
    it('should have correct default values', () => {
      fixture.detectChanges();
      expect(component.variant()).toBe('primary');
      expect(component.type()).toBe('button');
      expect(component.disabled()).toBeFalsy();
      expect(component.disabledMessage()).toBeUndefined();
      expect(component.loading()).toBeFalsy();
    });

    it('should apply correct variant class', () => {
      const variants: ButtonVariant[] = ['primary', 'secondary', 'outline'];

      variants.forEach((variant) => {
        hostComponent.variant = variant;
        hostFixture.detectChanges();
        const button = hostFixture.nativeElement.querySelector('button');
        expect(button.classList.contains(variant)).toBeTruthy();
      });
    });

    it('should set correct button type', () => {
      const types: ('button' | 'submit' | 'reset')[] = [
        'button',
        'submit',
        'reset',
      ];

      types.forEach((type) => {
        hostComponent.type = type;
        hostFixture.detectChanges();
        const button = hostFixture.nativeElement.querySelector('button');
        expect(button.type).toBe(type);
      });
    });
  });

  describe('Disabled state', () => {
    it('should set disabled attribute and aria-disabled', () => {
      hostComponent.disabled = true;
      hostFixture.detectChanges();
      const button = hostFixture.nativeElement.querySelector('button');

      expect(button.disabled).toBeTruthy();
      expect(button.getAttribute('aria-disabled')).toBe('true');
    });

    it('should set disabled message when provided', () => {
      hostComponent.disabled = true;
      hostComponent.disabledMessage = 'Button is disabled';
      hostFixture.detectChanges();
      const button = hostFixture.nativeElement.querySelector('button');

      expect(button.getAttribute('data-disabled-message')).toBe(
        'Button is disabled',
      );
    });

    it('should prevent click events when disabled', () => {
      hostComponent.disabled = true;
      hostFixture.detectChanges();
      const button = hostFixture.nativeElement.querySelector('button');

      button.click();
      expect(hostComponent.clickCount).toBe(0);
    });
  });

  describe('Loading state', () => {
    it('should show spinner and hide content when loading', () => {
      hostComponent.loading = true;
      hostFixture.detectChanges();

      const button = hostFixture.nativeElement.querySelector('button');
      const content = button.querySelector('div');
      const spinner = button.querySelector('.spinner');

      expect(content.classList.contains('invisible')).toBeTruthy();
      expect(spinner).toBeTruthy();
      expect(button.getAttribute('data-loading')).toBe('true');
      expect(button.getAttribute('aria-disabled')).toBe('true');
    });

    it('should prevent click events when loading', () => {
      hostComponent.loading = true;
      hostFixture.detectChanges();
      const button = hostFixture.nativeElement.querySelector('button');

      button.click();
      expect(hostComponent.clickCount).toBe(0);
    });
  });

  describe('Content projection', () => {
    it('should project content correctly', () => {
      hostFixture.detectChanges();
      const button = hostFixture.nativeElement.querySelector('button');
      expect(button.textContent.trim()).toBe('Button Text');
    });
  });

  describe('Lifecycle hooks', () => {
    it('should clean up click handler on destroy', () => {
      const removeEventListenerSpy = jest.spyOn(
        fixture.componentInstance['element'].nativeElement,
        'removeEventListener',
      );

      fixture.destroy();

      expect(removeEventListenerSpy).toHaveBeenCalledTimes(1);
    });
  });
});
