import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { CartService } from '../../cart.service';
import { CartActions } from '../../cart.actions';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

export const loadCartEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) =>
    actions$.pipe(
      ofType(CartActions.get),
      exhaustMap(() =>
        cartService.get().pipe(
          map((cart) => CartActions.getSuccess(cart)),
          catchError((error) => of(CartActions.getFailure({ error }))),
        ),
      ),
    ),
  { functional: true },
);
