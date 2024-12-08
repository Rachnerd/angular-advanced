import { InjectionToken } from '@angular/core';
import { ErrorHandler } from './error-handler.interface';

export const ERROR_HANDLER = new InjectionToken<ErrorHandler>('ErrorHandlers');
