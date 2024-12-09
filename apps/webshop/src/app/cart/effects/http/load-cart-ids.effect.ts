import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { CartService } from '../../cart.service';
import { CartActions } from '../../cart.actions';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

export const loadCartIdsEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) =>
    actions$.pipe(
      ofType(CartActions.getIds.type),
      exhaustMap(() =>
        cartService.getCartCount().pipe(
          map((cart) => CartActions.getIdsSuccess(cart)),
          catchError((error) => of(CartActions.getIdsFailure({ error }))),
        ),
      ),
    ),
  { functional: true },
);
