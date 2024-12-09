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
import { toSignal } from '@angular/core/rxjs-interop';
import { DarkModeToggleComponent } from '@angular-advanced/ui-components/dark-mode-toggle/dark-mode-toggle.component';
import { HeaderComponent } from '@angular-advanced/ui-components/header/header.component';
import { CartIconComponent } from '@angular-advanced/ui-components/cart-icon/cart-icon.component';
import { ToasterSmartComponent } from './toaster/toaster.component';
import { Store } from '@ngrx/store';
import { cartFeature } from './cart/cart.feature';
import { CartActions } from './cart/cart.actions';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    DarkModeToggleComponent,
    AuthStatusIconComponent,
    HeaderComponent,
    CartIconComponent,
    ToasterSmartComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  protected auth = inject(AuthService);
  private store = inject(Store);
  cartCount = toSignal(this.store.select(cartFeature.selectCartCount), {
    initialValue: 0,
  });
  user = toSignal(inject(UserService).user$);

  ngOnInit() {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.store.dispatch(CartActions.getIds());
      }
    });
  }
}
