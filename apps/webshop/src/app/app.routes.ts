import { Route } from '@angular/router';
import { ProductsPageComponent } from './pages/products/products-page.component';
import { LoginPageComponent } from './pages/login/login-page.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: ProductsPageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
];
