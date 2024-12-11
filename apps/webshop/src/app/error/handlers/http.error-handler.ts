import { inject, Injectable } from '@angular/core';
import { ErrorHandler } from '../error-handler.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toaster.service';

@Injectable()
export class HttpErrorHandler implements ErrorHandler {
  private router = inject(Router);
  private toasterService = inject(ToastService);

  handle(error: unknown) {
    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case 401:
          this.toasterService.show(`You need to be logged in!`, 'error');
          this.router.navigate(['/login'], {
            queryParams: {
              returnUrl: this.router.url,
            },
          });
          break;
        case 403:
          this.toasterService.show(`You don't have permission!`, 'error');
          this.router.navigate(['/forbidden']);
          break;
      }
    }
    console.log(error);
  }
}
