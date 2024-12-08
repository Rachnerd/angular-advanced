import { inject } from '@angular/core';
import { ToastService } from '../toaster/toaster.service';
import { tap } from 'rxjs';
import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';

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
