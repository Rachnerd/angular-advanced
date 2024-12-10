// JSON Schema for Fastify validation
export const searchQuerySchema = {
  type: 'object',
  properties: {
    page: {
      type: 'number',
      minimum: 1,
      default: 1,
    },
    limit: {
      type: 'number',
      minimum: 1,
      maximum: 100,
      default: 20,
    },
    search: {
      type: 'string',
    },
    category: {
      type: 'string',
    },
    minPrice: {
      type: 'number',
      minimum: 0,
    },
    maxPrice: {
      type: 'number',
      minimum: 0,
    },
    type: {
      type: 'string',
      enum: ['default', 'limited', 'out-of-stock'],
    },
    sortBy: {
      type: 'string',
      enum: ['price', 'rating', 'title'],
    },
    sortOrder: {
      type: 'string',
      enum: ['asc', 'desc'],
    },
  },
  additionalProperties: false,
} as const;
