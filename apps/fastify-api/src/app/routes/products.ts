import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { PRODUCT_DATA } from '../data/product.data';
import { ApiProduct } from '@angular-advanced/server-types';

interface RouteParams {
  id: string;
}

// Schema for product validation
const productSchema = {
  type: 'object',
  required: ['title', 'price', 'description', 'category'],
  properties: {
    id: { type: 'integer' },
    title: { type: 'string' },
    price: { type: 'number' },
    description: { type: 'string' },
    category: { type: 'string' },
    image: { type: 'string' },
    rating: {
      type: 'object',
      properties: {
        rate: { type: 'number' },
        count: { type: 'integer' },
      },
    },
    type: { type: 'string' },
  },
} as const;

// Pagination query schema
const paginationQuerySchema = {
  type: 'object',
  properties: {
    page: { type: 'integer', minimum: 1 },
    limit: { type: 'integer', minimum: 1, maximum: 100 },
    sort: { type: 'string', enum: ['price', 'title', 'id'] },
    order: { type: 'string', enum: ['asc', 'desc'] },
  },
} as const;

const getProductsSchema = {
  querystring: paginationQuerySchema,
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

const getProductSchema = {
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

interface PaginationQuery {
  page?: number;
  limit?: number;
  sort?: 'price' | 'title' | 'id';
  order?: 'asc' | 'desc';
}

interface PaginatedResponse<T> {
  data: T[];
  metadata: {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

// Pagination helper function
function paginateProducts<T extends { id: string }>(
  items: T[],
  page = 1,
  limit = 10,
  sort?: string,
  order: 'asc' | 'desc' = 'asc',
): PaginatedResponse<T> {
  // Sort items if requested
  const sortedItems = [...items];
  if (sort) {
    sortedItems.sort((a, b) => {
      const compareResult = a[sort] < b[sort] ? -1 : a[sort] > b[sort] ? 1 : 0;
      return order === 'asc' ? compareResult : -compareResult;
    });
  }

  // Calculate pagination values
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / limit);
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * limit;
  const endIndex = Math.min(startIndex + limit, totalItems);

  // Get paginated data
  const paginatedItems = sortedItems.slice(startIndex, endIndex);

  return {
    data: paginatedItems,
    metadata: {
      totalItems,
      itemsPerPage: limit,
      currentPage,
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    },
  };
}

export default async function (fastify: FastifyInstance) {
  fastify.get<{ Querystring: PaginationQuery }>(
    '/products',
    {
      schema: getProductsSchema,
      preHandler: [
        // authenticate,
        // checkRole(['admin']),
      ],
    },
    async (
      request: FastifyRequest<{ Querystring: PaginationQuery }>,
    ): Promise<PaginatedResponse<ApiProduct>> => {
      const { page = 1, limit = 10, sort, order = 'asc' } = request.query;
      return paginateProducts(PRODUCT_DATA, page, limit, sort, order);
    },
  );

  fastify.get<{ Params: RouteParams }>(
    '/products/:id',
    { schema: getProductSchema },
    async (
      request: FastifyRequest<{ Params: RouteParams }>,
      reply: FastifyReply,
    ): Promise<ApiProduct> => {
      const product = PRODUCT_DATA.find((p) => p.id === request.params.id);
      if (!product) {
        reply.code(404).send({ error: 'Product not found' });
        throw new Error('Product not found');
      }
      return product;
    },
  );
}
