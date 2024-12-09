import { Route } from '@angular/router';
import { ForbiddenPageComponent } from './pages/forbidden/forbidden.component';
import { roleGuard } from '@angular-advanced/auth';
import { LogoutPageComponent } from './pages/logout/logout-page.component';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('../app/pages/products/products-page.component').then(
        (m) => m.ProductsPageComponent,
      ),
  },
  {
    path: 'products-side',
    loadComponent: () =>
      import('../app/pages/products-side/products-side.component').then(
        (m) => m.ProductsSidePageComponent,
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../app/pages/login/login-page.component').then(
        ({ LoginPageComponent }) => LoginPageComponent,
      ),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('../app/pages/cart/cart-page.component').then(
        (m) => m.CartPageComponent,
      ),
    canActivate: [roleGuard],
    data: {
      roles: ['user', 'admin'],
    },
  },
  {
    path: 'forbidden',
    component: ForbiddenPageComponent,
  },
  {
    path: 'not-found',
    component: ForbiddenPageComponent,
  },
  {
    path: 'logout',
    component: LogoutPageComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
