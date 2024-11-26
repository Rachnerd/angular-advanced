import { Component, contentChildren, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'ui-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class FormComponent {
  formGroup = input.required<FormGroup>();
  loading = input(false);
  size = input<'sm' | 'md' | 'lg'>('sm');
  showActions = input(true);
  stickyActions = input(false);
  inputs = contentChildren(InputComponent);

  submitForm = output();

  onSubmit(): void {
    if (this.formGroup().valid) {
      this.handleValidSubmit();
    } else {
      this.handleInvalidSubmit();
    }
  }

  private handleValidSubmit(): void {
    this.submitForm.emit();
  }

  private handleInvalidSubmit(): void {
    Object.keys(this.formGroup().controls).forEach((key) => {
      const control = this.formGroup().get(key);
      control?.markAsTouched();
    });
  }
}
