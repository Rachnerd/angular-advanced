import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';
import { firstValueFrom } from 'rxjs';
import { User } from '../models/auth.model';

interface RoleGuardData {
  roles: User['role'][];
}

export const roleGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);

  // Get the roles from the route data
  const { roles } = route.data as RoleGuardData;

  // If no roles are required, allow access
  if (!roles?.length) {
    return true;
  }

  const user = await firstValueFrom(userService.user$);
  // First check if the user is authenticated
  if (!user) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  // Get user's role from auth service
  const { role } = user;

  // Check if user's role is included in the allowed roles
  const hasRequiredRole = roles.includes(role);

  if (!hasRequiredRole) {
    // Redirect to unauthorized page or dashboard
    router.navigate(['/forbidden']);
    return false;
  }

  return true;
};
