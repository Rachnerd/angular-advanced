import { FastifySchema } from 'fastify';

export const updateCartProductSchema: FastifySchema = {
  params: {
    type: 'object',
    properties: {
      productId: { type: 'string' },
    },
    required: ['productId'],
  },
  body: {
    type: 'object',
    properties: {
      quantity: { type: 'integer', minimum: 1 },
    },
    required: ['quantity'],
  },
};
