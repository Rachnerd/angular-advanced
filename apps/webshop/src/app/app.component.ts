import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  DarkModeToggleComponent,
  HeaderComponent,
} from '@angular-advanced/ui-components';
import { AuthService, AuthStatusIconComponent } from '@angular-advanced/auth';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    DarkModeToggleComponent,
    AuthStatusIconComponent,
    HeaderComponent,
    AsyncPipe,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected auth = inject(AuthService);

  logout() {
    this.auth.logout().subscribe({
      next: () => {
        location.reload();
      },
    });
  }
}
