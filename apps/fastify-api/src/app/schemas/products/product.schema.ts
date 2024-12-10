
// Schema for product validation
export const productSchema = {
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
