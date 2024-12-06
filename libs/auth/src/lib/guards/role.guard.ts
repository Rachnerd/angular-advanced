import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';
import { firstValueFrom } from 'rxjs';
import { User } from '../models/auth.model';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

interface RoleGuardData {
  roles: User['role'][];
}

export const roleGuard: CanActivateFn = async (route) => {
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
    throw new HttpErrorResponse({
      error: new Error('Tried to access protected route.'),
      status: HttpStatusCode.Unauthorized,
      statusText: 'Unauthorized',
      url: `Client: /${route.url}`,
    });
  }

  // Get user's role from auth service
  const { role } = user;

  // Check if user's role is included in the allowed roles
  const hasRequiredRole = roles.includes(role);

  if (!hasRequiredRole) {
    throw new HttpErrorResponse({
      error: new Error(
        `Tried to access protected route without role: ${roles.join(',')}`,
      ),
      status: HttpStatusCode.Forbidden,
      statusText: 'Forbidden',
      url: `Client: /${route.url}`,
    });
  }

  return true;
};
