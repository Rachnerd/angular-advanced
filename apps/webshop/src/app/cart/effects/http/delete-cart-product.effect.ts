import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { CartService } from '../../cart.service';
import { CartActions } from '../../cart.actions';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

export const deleteCartProductEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) =>
    actions$.pipe(
      ofType(CartActions.delete),
      exhaustMap(({ id }) =>
        cartService.delete(id).pipe(
          map(() => CartActions.deleteSuccess({ id })),
          catchError((error) => of(CartActions.deleteFailure({ error }))),
        ),
      ),
    ),
  { functional: true },
);
