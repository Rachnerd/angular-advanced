import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@angular-advanced/auth';
import { firstValueFrom } from 'rxjs';
import { ButtonComponent } from '@angular-advanced/ui-components/button/button.component';
import { InputComponent } from '@angular-advanced/ui-components/input/input.component';
import { FormComponent } from '@angular-advanced/ui-components/form/form.component';
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
export class LoginPageComponent implements OnInit {
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

  ngOnInit() {
    firstValueFrom(this.auth.isAuthenticated$).then((isAuthenticated) => {
      if (isAuthenticated) {
        this.navigate();
      }
    });
  }

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  async login() {
    const { password, username } = this.form.value;
    if (password && username) {
      this.loading.set(true);
      await firstValueFrom(this.auth.login(username, password));
      this.navigate();
    }
  }

  private navigate() {
    const { returnUrl = '' } = this.route.snapshot.queryParams;
    this.router.navigate([returnUrl]);
  }
}
