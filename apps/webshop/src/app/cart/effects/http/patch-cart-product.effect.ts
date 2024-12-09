import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { CartService } from '../../cart.service';
import { CartActions } from '../../cart.actions';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

export const patchCartProductEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) =>
    actions$.pipe(
      ofType(CartActions.patch),
      exhaustMap(({ id, quantity }) =>
        cartService.update(id, quantity).pipe(
          map((updatedCartProduct) =>
            CartActions.patchSuccess(updatedCartProduct),
          ),
          catchError((error) => of(CartActions.patchFailure({ error }))),
        ),
      ),
    ),
  { functional: true },
);
