import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainTemplateComponent } from '@angular-advanced/ui-components/main-template/main-template.component';
import { DarkModeToggleComponent } from '@angular-advanced/ui-components/dark-mode-toggle/dark-mode-toggle.component';
import { AuthStatusIconComponent } from '@angular-advanced/ui-components/auth-status-icon/auth-status-icon.component';
import { AuthService } from './auth/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    MainTemplateComponent,
    DarkModeToggleComponent,
    AuthStatusIconComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  auth = inject(AuthService);
  isAuthenticated = toSignal(this.auth.currentUser$);
}
