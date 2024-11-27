import { Component, forwardRef, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ui-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  checked = input(false);
  disabled = input(false);

  protected value = false;
  protected isDisabled = false;
  protected isFocused = false;

  private onChange?: (value: boolean) => void;
  private onTouch?: () => void;

  writeValue(value: boolean): void {
    this.value = value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  protected onCheckedChange(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.onChange?.(checked);
  }

  protected onCheckedBlur() {
    this.onTouch?.();
  }
}
