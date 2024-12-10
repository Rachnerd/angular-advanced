import { searchQuerySchema } from './search.schema';
import { productSchema } from './product.schema';

export const getProductsSchema = {
  querystring: searchQuerySchema,
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: productSchema,
        },
        metadata: {
          type: 'object',
          properties: {
            totalItems: { type: 'integer' },
            itemsPerPage: { type: 'integer' },
            currentPage: { type: 'integer' },
            totalPages: { type: 'integer' },
            hasNextPage: { type: 'boolean' },
            hasPreviousPage: { type: 'boolean' },
          },
        },
      },
    },
  },
} as const;
