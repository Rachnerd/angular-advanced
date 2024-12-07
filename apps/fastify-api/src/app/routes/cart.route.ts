import { FastifyInstance, FastifyRequest } from 'fastify';
import {
  ApiCart,
  ApiCartProduct,
  ApiCartProducts,
  ApiProduct,
} from '@angular-advanced/server-types';
import { authenticate } from '../auth/auth.pre-hook-handler';
import { PRODUCT_DATA } from '../data/product.data';

// In-memory storage
const products = new Map<string, ApiProduct>();
const carts = new Map<string, ApiCart>();

PRODUCT_DATA.forEach((product) => products.set(product.id, product));

export default async function (fastify: FastifyInstance) {
  // Get cart with only ids.
  fastify.get(
    '/cart',
    { preHandler: authenticate },
    async (
      request: FastifyRequest<{
        Params: { userId: string };
      }>,
    ) => {
      const userId = request.user.id;
      const existingCart = carts.get(userId);
      if (existingCart) {
        return existingCart;
      }
      const newCart: ApiCart = { userId, entries: [] };
      carts.set(userId, newCart);
      return newCart;
    },
  );

  const populateCart = (cart: ApiCart): ApiCartProducts => {
    const cartProducts = cart.entries.map((item) => {
      const product = products.get(item.productId);
      if (!product) throw new Error(`Product ${item.productId} not found`);
      return {
        product,
        quantity: item.quantity,
        total: (Math.round(product.price * 100) * item.quantity) / 100,
      };
    });
    return {
      ...cart,
      products: cartProducts,
      total:
        cartProducts.reduce((sum, item) => {
          const itemTotal =
            Math.round(item.product.price * 100) * item.quantity;
          return sum + itemTotal;
        }, 0) / 100,
    };
  };

  // Get total price of cart
  fastify.get(
    '/cart/total',
    { preHandler: authenticate },
    async (request: FastifyRequest) => {
      const userId = request.user.id;
      const existingCart = carts.get(userId);
      if (!existingCart) {
        const newCart: ApiCart = { userId, entries: [] };
        carts.set(userId, newCart);
        return 0;
      }

      return populateCart(existingCart).total;
    },
  );

  // Get cart with products.
  fastify.get(
    '/cart/products',
    { preHandler: authenticate },
    async (
      request: FastifyRequest<{
        Params: { userId: string };
      }>,
    ): Promise<ApiCartProducts> => {
      const userId = request.user.id;
      let cart = carts.get(userId);
      if (!cart) {
        cart = { userId, entries: [] };
        carts.set(userId, cart);
      }
      return populateCart(cart);
    },
  );

  // Add product to cart
  fastify.post(
    '/cart/products',
    { preHandler: authenticate },
    async (
      request: FastifyRequest<{
        Body: { productId: string; quantity: number };
      }>,
    ) => {
      const userId = request.user.id;
      const { productId, quantity } = request.body;

      const product = products.get(productId);
      if (!product) throw new Error('Product not found');

      let cart = carts.get(userId);
      if (!cart) {
        cart = { userId, entries: [] };
        carts.set(userId, cart);
      }

      const existingItem = cart.entries.find(
        (item) => item.productId === productId,
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.entries.push({ productId, quantity });
      }
      return cart;
    },
  );

  // Update cart product quantity
  fastify.patch(
    '/cart/products/:productId',
    { preHandler: authenticate },
    async (
      request: FastifyRequest<{
        Params: { productId: string };
        Body: { quantity: number };
      }>,
    ): Promise<ApiCartProduct> => {
      const userId = request.user.id;
      const { productId } = request.params;
      const { quantity } = request.body;

      const cart = carts.get(userId);
      if (!cart) throw new Error('Cart not found');

      const entry = cart.entries.find((item) => item.productId === productId);
      if (!entry) throw new Error('Item not found in cart');

      const product = products.get(productId);
      if (!product) throw new Error('Product not found');

      entry.quantity = quantity;
      return {
        ...entry,
        product,
        total: (Math.round(product.price * 100) * entry.quantity) / 100,
      };
    },
  );

  // Remove product from cart
  fastify.delete(
    '/cart/products/:productId',
    { preHandler: authenticate },
    async (
      request: FastifyRequest<{
        Params: { userId: string; productId: string };
      }>,
    ) => {
      const userId = request.user.id;
      const { productId } = request.params;

      const cart = carts.get(userId);
      if (!cart) throw new Error('Cart not found');

      cart.entries = cart.entries.filter(
        (item) => item.productId !== productId,
      );
      return cart;
    },
  );
}
