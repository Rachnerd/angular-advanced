import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { CartActions } from '../../cart.actions';
import { exhaustMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { cartFeature } from '../../cart.feature';

export const updateCartTotalPriceEffect = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) =>
    actions$.pipe(
      ofType(CartActions.patchSuccess, CartActions.deleteSuccess),
      withLatestFrom(store.select(cartFeature.selectCartCount)),
      exhaustMap(([, cartCount]) => {
        if (cartCount === 0) {
          return of(
            CartActions.getTotalSuccess({
              total: 0,
            }),
          );
        }
        return of(CartActions.getTotal());
      }),
    ),
  { functional: true },
);
