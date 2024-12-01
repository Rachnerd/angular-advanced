import { Route } from '@angular/router';
import { ProductsPageComponent } from './pages/products/products-page.component';
import { LoginPageComponent } from './pages/login/login-page.component';
import { ForbiddenPageComponent } from './pages/forbidden/forbidden.component';
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
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'forbidden',
    component: ForbiddenPageComponent,
  },
];
