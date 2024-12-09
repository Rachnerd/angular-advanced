import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { CartService } from '../../cart.service';
import { CartActions } from '../../cart.actions';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

export const loadCartTotalEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) =>
    actions$.pipe(
      ofType(CartActions.getTotal),
      exhaustMap(() =>
        cartService.getTotalPrice().pipe(
          map((total) => CartActions.getTotalSuccess({ total })),
          catchError((error) => of(CartActions.getTotalFailure({ error }))),
        ),
      ),
    ),
  { functional: true },
);
