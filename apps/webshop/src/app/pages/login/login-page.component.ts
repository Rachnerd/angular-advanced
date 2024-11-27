import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '@angular-advanced/ui-components/button/button.component';
import { InputComponent } from '@angular-advanced/ui-components/input/input.component';
import { FormComponent } from '@angular-advanced/ui-components/form/form.component';
import { CheckboxComponent } from '@angular-advanced/ui-components/checkbox/checkbox.component';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    InputComponent,
    FormComponent,
    ReactiveFormsModule,
    CheckboxComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  protected username = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  protected password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  protected rememberMe = new FormControl(false, {
    nonNullable: true,
  });

  protected form = new FormGroup({
    username: this.username,
    password: this.password,
    rememberMe: this.rememberMe,
  });

  protected loading = signal(false);

  private auth = inject(AuthService);
  private router = inject(Router);

  login() {
    const { password, username, rememberMe = false } = this.form.value;

    if (password && username) {
      this.loading.set(true);
      this.auth.login(rememberMe).subscribe({
        next: () => this.router.navigate(['']),
        error: (e) => console.error(e),
      });
    }
  }
}
