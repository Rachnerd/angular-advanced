import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { CartService } from '../../cart.service';
import { CartActions } from '../../cart.actions';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

export const postCartProductEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) =>
    actions$.pipe(
      ofType(CartActions.post),
      exhaustMap(({ id, quantity }) =>
        cartService.post(id, quantity).pipe(
          map(() =>
            CartActions.postSuccess({
              id,
            }),
          ),
          catchError((error) => of(CartActions.postFailure({ error }))),
        ),
      ),
    ),
  { functional: true },
);
