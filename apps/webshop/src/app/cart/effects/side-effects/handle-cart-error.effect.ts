import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ErrorHandler, inject } from '@angular/core';
import { CartActions } from '../../cart.actions';
import { tap } from 'rxjs';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { ToastService } from '../../../toaster/toaster.service';

export const handleCartErrorEffect = createEffect(
  (
    actions$ = inject(Actions),
    errorHandler = inject(ErrorHandler),
    toasterService = inject(ToastService),
  ) =>
    actions$.pipe(
      ofType(
        CartActions.getIdsFailure,
        CartActions.getFailure,
        CartActions.postFailure,
        CartActions.patchFailure,
        CartActions.getTotalFailure,
        CartActions.deleteFailure,
      ),
      tap(({ error, type }) => {
        // Fit-for-purpose error handling.
        // This only triggers if the getCartIds endpoint is wrongly configured in CartService.
        if (
          type === CartActions.getIdsFailure.type &&
          error instanceof HttpErrorResponse &&
          error.status === HttpStatusCode.NotFound
        ) {
          toasterService.show(`It seems we can't find your cart!`, 'error');
          return;
        }
        // Generic error handling
        errorHandler.handleError(error);
      }),
    ),
  { functional: true, dispatch: false },
);
