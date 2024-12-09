import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { ApiCartProducts } from '@angular-advanced/server-types';
import { CartActions } from './cart.actions';

type CartState = ApiCartProducts & { productIds: string[] };

const initialState: CartState = {
  productIds: [],
  total: 0,
  products: [],
};

export const cartFeature = createFeature({
  name: 'cart',
  reducer: createReducer(
    initialState,
    on(CartActions.getIdsSuccess, (cart, { entries }) => ({
      ...cart,
      productIds: entries.map(({ productId }) => productId),
    })),
    on(CartActions.getSuccess, (_, { total, products }) => ({
      total,
      products,
      productIds: products.map(({ product }) => product.id),
    })),
    on(CartActions.postSuccess, (cart, { id }) => ({
      ...cart,
      productIds: cart.productIds.includes(id)
        ? cart.productIds
        : [...cart.productIds, id],
    })),
    on(CartActions.patchSuccess, (cart, updated) => ({
      ...cart,
      products: cart.products.map((entry) =>
        entry.product.id === updated.product.id ? updated : entry,
      ),
    })),
    on(CartActions.deleteSuccess, (cart, { id }) => {
      const filteredProducts = cart.products.filter(
        ({ product }) => product.id !== id,
      );
      return {
        ...cart,
        products: filteredProducts,
        productIds: filteredProducts.map(({ product }) => product.id),
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
      ({ productIds }) => productIds.length,
    ),
  }),
});
