import {
  Component,
  forwardRef,
  ElementRef,
  ViewChild,
  input,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ui-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements ControlValueAccessor {
  @ViewChild('input') inputElement!: ElementRef;
  id = input(`input-${Math.random().toString(36).substr(2, 9)}`);
  formControlName = input.required<string>();
  label = input('');
  type = input('text');
  placeholder = input('');
  hint = input('');
  required = input(false);
  leadingIcon = input(false);
  trailingIcon = input(false);
  hasError = input(false);
  errorMessage = input<string>();

  protected value = signal('');
  protected disabled = signal(false);
  protected focused = signal(false);

  private onChange?: (value: string) => void;
  private onTouch?: () => void;

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled.set(disabled);
  }

  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value.set(value);
    this.onChange?.(value);
  }

  onFocus(): void {
    this.focused.set(true);
    this.focus();
  }

  onBlur(): void {
    this.focused.set(false);
    this.onTouch?.();
  }

  focus(): void {
    this.inputElement.nativeElement.focus();
  }
}
