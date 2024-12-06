import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private router: Router) {}

  handleError(error: Error) {
    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case 401:
          this.router.navigate(['/login']);
          break;
        case 403:
          this.router.navigate(['/forbidden']);
          break;
        default:
          console.error(error);
      }
    }
    // Send error to analytics
  }
}
