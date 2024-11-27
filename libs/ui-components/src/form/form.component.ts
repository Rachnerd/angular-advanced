import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

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
  showActions = input(true);
  stickyActions = input(false);
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
