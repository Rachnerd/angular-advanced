import { ErrorHandler, inject, Injectable } from '@angular/core';
import { ERROR_HANDLER } from './error-hander.token';
import { ErrorHandler as CustomErrorHandler } from './error-handler.interface';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private errorHandlers = inject<CustomErrorHandler[]>(ERROR_HANDLER) ?? [];

  handleError(error: unknown) {
    this.errorHandlers.forEach((errorHandler) => errorHandler.handle(error));
  }
}
