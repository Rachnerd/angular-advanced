import { productSchema } from './product.schema';

export const getProductSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
    },
  },
  response: {
    200: productSchema,
  },
} as const;
