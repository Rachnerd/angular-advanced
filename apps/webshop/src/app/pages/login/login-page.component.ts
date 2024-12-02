import { Component, effect, inject, signal } from '@angular/core';
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
import { Router } from '@angular/router';
import { AuthService } from '@angular-advanced/auth';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    InputComponent,
    FormComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  protected username = new FormControl('test@example.com', [
    Validators.required,
    Validators.minLength(4),
  ]);

  protected password = new FormControl('password', [
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

  ngOnInit() {
    firstValueFrom(this.auth.isAuthenticated$).then((isAuthenticated) => {
      if (isAuthenticated) {
        this.navigateToHome();
      }
    });
  }

  login() {
    const { password, username } = this.form.value;
    if (password && username) {
      this.loading.set(true);
      this.auth.login(username, password).subscribe({
        next: () => this.navigateToHome(),
        error: () => {
          this.loading.set(false);
        },
      });
    }
  }

  private navigateToHome() {
    this.router.navigate(['']);
  }
}
