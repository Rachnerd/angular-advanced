import { Route } from '@angular/router';
import { ProductsPageComponent } from './pages/products/products-page.component';
import { LoginPageComponent } from './pages/login/login-page.component';
import { ForbiddenPageComponent } from './pages/forbidden/forbidden.component';
import { ProductsSidePageComponent } from './pages/products-side/products-side.component';

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
    path: 'forbidden',
    component: ForbiddenPageComponent,
  },
];
