import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthService,
  AuthStatusIconComponent,
  UserService,
} from '@angular-advanced/auth';
import { AsyncPipe } from '@angular/common';
import { CartService } from './cart/cart.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { first, map } from 'rxjs';
import { DarkModeToggleComponent } from '@angular-advanced/ui-components/dark-mode-toggle/dark-mode-toggle.component';
import { HeaderComponent } from '@angular-advanced/ui-components/header/header.component';
import { CartIconComponent } from '@angular-advanced/ui-components/cart-icon/cart-icon.component';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    DarkModeToggleComponent,
    AuthStatusIconComponent,
    HeaderComponent,
    AsyncPipe,
    CartIconComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  protected auth = inject(AuthService);
  protected userService = inject(UserService);
  private cartService = inject(CartService);
  cartCount = toSignal(
    this.cartService.cart$.pipe(map((cart) => cart.products.length)),
  );

  ngOnInit() {
    this.auth.isAuthenticated$.pipe(first()).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.cartService.get();
      }
    });
  }

  logout() {
    this.auth.logout().subscribe({
      next: () => {
        location.reload();
      },
    });
  }
}
