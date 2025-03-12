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
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { MainTemplateComponent } from '@angular-advanced/ui-components/main-template/main-template.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    InputComponent,
    FormComponent,
    ReactiveFormsModule,
    MainTemplateComponent,
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

  protected form = new FormGroup({
    username: this.username,
    password: this.password,
  });

  protected loading = signal(false);

  private auth = inject(AuthService);
  private router = inject(Router);

  login() {
    const { password, username } = this.form.value;
    if (password && username) {
      this.loading.set(true);
      this.auth.login().subscribe({
        next: () => this.router.navigate(['']),
        error: (e) => console.error(e),
      });
    }
  }
}
