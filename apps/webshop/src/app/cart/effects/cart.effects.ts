import { FunctionalEffect } from '@ngrx/effects/src/models';
import { postCartProductEffect } from './http/post-cart-product.effect';
import { loadCartIdsEffect } from './http/load-cart-ids.effect';
import { loadCartEffect } from './http/load-cart.effect';
import { patchCartProductEffect } from './http/patch-cart-product.effect';
import { deleteCartProductEffect } from './http/delete-cart-product.effect';
import { loadCartTotalEffect } from './http/load-cart-total.effect';
import { updateCartTotalPriceEffect } from './side-effects/update-cart-total-price.effect';
import { handleCartErrorEffect } from './side-effects/handle-cart-error.effect';

export const CartEffects: Record<string, FunctionalEffect> = {
  // Http effects
  loadCartIdsEffect,
  loadCartEffect,
  loadCartTotalEffect,
  postCartProductEffect,
  patchCartProductEffect,
  deleteCartProductEffect,
  // Side effects
  updateCartTotalPriceEffect,
  handleCartErrorEffect,
};
