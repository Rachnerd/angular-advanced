import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { ApiCartProduct } from '@angular-advanced/server-types';
import { CartActions } from './cart.actions';

interface Normalized<T> {
  byId: Record<string, T>;
  ids: string[];
}

interface CartState {
  entries: Normalized<ApiCartProduct>;
  total: number;
}

const initialState: CartState = {
  total: 0,
  entries: {
    byId: {},
    ids: [],
  },
};

export const cartFeature = createFeature({
  name: 'cart',
  reducer: createReducer(
    initialState,
    on(CartActions.getIdsSuccess, (cart, { entries }) => ({
      ...cart,
      entries: {
        ...cart.entries,
        ids: entries.map(({ productId }) => productId),
      },
    })),
    on(CartActions.getSuccess, (_, { total, products }) => ({
      total,
      entries: {
        byId: products.reduce(
          (acc, entry) => ({
            ...acc,
            [entry.product.id]: entry,
          }),
          {},
        ),
        ids: products.map(({ product }) => product.id),
      },
    })),
    on(CartActions.postSuccess, (cart, { id }) => ({
      ...cart,
      entries: {
        ...cart.entries,
        ids: cart.entries.ids.includes(id)
          ? cart.entries.ids
          : [...cart.entries.ids, id],
      },
    })),
    on(CartActions.patchSuccess, (cart, updated) => ({
      ...cart,
      entries: {
        ...cart.entries,
        byId: {
          ...cart.entries.byId,
          [updated.product.id]: updated,
        },
      },
    })),
    on(CartActions.deleteSuccess, (cart, { id }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [id]: removedEntry, ...remainingEntries } = cart.entries.byId;
      return {
        ...cart,
        entries: {
          byId: {
            ...remainingEntries,
          },
          ids: cart.entries.ids.filter((productId) => productId !== id),
        },
      };
    }),
    on(CartActions.getTotalSuccess, (cart, { total }) => ({
      ...cart,
      total,
    })),
  ),
  extraSelectors: ({ selectCartState }) => ({
    selectCartCount: createSelector(
      selectCartState,
      ({ entries: { ids } }) => ids.length,
    ),
    selectCartWithProducts: createSelector(selectCartState, (cart) => ({
      total: cart.total,
      products: cart.entries.ids
        .map((id) => cart.entries.byId[id])
        .filter((entry) => entry !== undefined),
    })),
  }),
});
