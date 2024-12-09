import { createAction, props } from '@ngrx/store';
import type {
  ApiCart,
  ApiCartProduct,
  ApiCartProducts,
} from '@angular-advanced/server-types';

export const CartActions = {
  /**
   * Get cart ids for cart count inside the header.
   */
  getIds: createAction('[Cart] Load simple cart'),
  getIdsSuccess: createAction(
    '[Cart] Load simple cart success',
    props<ApiCart>(),
  ),
  getIdsFailure: createAction(
    '[Cart] Load simple cart failure',
    props<{ error: Error }>(),
  ),
  /**
   * Get full cart including products.
   */
  get: createAction('[Cart] Load full cart'),
  getSuccess: createAction(
    '[Cart] Load full cart success',
    props<ApiCartProducts>(),
  ),
  getFailure: createAction(
    '[Cart] Load full cart failure',
    props<{ error: Error }>(),
  ),
  /**
   * Add product to cart.
   */
  post: createAction(
    '[Cart] Add product to cart',
    props<{ id: string; quantity: number }>(),
  ),
  postSuccess: createAction(
    '[Cart] Add product to cart success',
    props<{ id: string }>(),
  ),
  postFailure: createAction(
    '[Cart] Add product to cart failure',
    props<{ error: Error }>(),
  ),
  /**
   * Patch a product inside the cart.
   */
  patch: createAction(
    '[Cart] Patch product inside cart',
    props<{ id: string; quantity: number }>(),
  ),
  patchSuccess: createAction(
    '[Cart] Patch product inside cart success',
    props<ApiCartProduct>(),
  ),
  patchFailure: createAction(
    '[Cart] Patch product inside cart failure',
    props<{ error: Error }>(),
  ),
  /**
   * Delete a product inside the cart.
   */
  delete: createAction(
    '[Cart] Delete product inside cart',
    props<{ id: string }>(),
  ),
  deleteSuccess: createAction(
    '[Cart] Delete product inside cart success',
    props<{ id: string }>(),
  ),
  deleteFailure: createAction(
    '[Cart] Delete product inside cart failure',
    props<{ error: Error }>(),
  ),
  /**
   * Get total price calculated in the backend.
   */
  getTotal: createAction('[Cart] Get cart total'),
  getTotalSuccess: createAction(
    '[Cart] Get cart total success',
    props<{ total: number }>(),
  ),
  getTotalFailure: createAction(
    '[Cart] Get cart total failure',
    props<{ error: Error }>(),
  ),
};
