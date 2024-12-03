import { Route } from '@angular/router';
import { ProductsPageComponent } from './pages/products/products-page.component';
import { LoginPageComponent } from './pages/login/login-page.component';
import { ForbiddenPageComponent } from './pages/forbidden/forbidden.component';
import { ProductsSidePageComponent } from './pages/products-side/products-side.component';
import { CartPageComponent } from './pages/cart/cart-page.component';
import { roleGuard } from '@angular-advanced/auth';

export const appRoutes: Route[] = [
  {
    path: '',
    component: ProductsPageComponent,
    // canActivate: [roleGuard],
    // data: {
    //   roles: ['admin'],
    // },
  },
  {
    path: 'products-side',
    component: ProductsSidePageComponent,
    // canActivate: [roleGuard],
    // data: {
    //   roles: ['admin'],
    // },
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'cart',
    component: CartPageComponent,
    canActivate: [roleGuard],
    data: {
      roles: ['user', 'admin'],
    },
  },
  {
    path: 'forbidden',
    component: ForbiddenPageComponent,
  },
];
