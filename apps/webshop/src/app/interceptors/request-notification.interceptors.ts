import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { ToastService } from '../services/toaster.service';

export const requestNotificationInterceptor: HttpInterceptorFn = (
  request,
  next,
) => {
  const toasterService = inject(ToastService);
  return next(request).pipe(
    tap((res) => {
      if (res instanceof HttpResponse) {
        toasterService.show(
          `${request.method}: ${request.url}${request.params ? `/${request.params}` : ''}`,
          'success',
        );
      }
    }),
  );
};
