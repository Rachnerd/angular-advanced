// Base schemas
const cartEntrySchema = {
  type: 'object',
  properties: {
    productId: { type: 'string' },
    quantity: { type: 'integer', minimum: 1 },
  },
  required: ['productId', 'quantity'],
};

const productSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    price: { type: 'number' },
    description: { type: 'string' },
  },
  required: ['id', 'name', 'price', 'description'],
};

export const getCartSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        userId: { type: 'string' },
        entries: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              productId: { type: 'string' },
              quantity: { type: 'integer', minimum: 1 },
            },
            required: ['productId', 'quantity'],
          },
        },
      },
      required: ['userId', 'entries'],
    },
  },
};

const cartProductSchema = {
  type: 'object',
  properties: {
    product: productSchema,
    quantity: { type: 'integer', minimum: 1 },
    total: { type: 'number' },
  },
  required: ['product', 'quantity', 'total'],
};

const cartProductsSchema = {
  type: 'object',
  properties: {
    userId: { type: 'string' },
    entries: {
      type: 'array',
      items: cartEntrySchema,
    },
    products: {
      type: 'array',
      items: cartProductSchema,
    },
    total: { type: 'number' },
  },
  required: ['userId', 'entries', 'products', 'total'],
};

// Error response schema
const errorSchema = {
  type: 'object',
  properties: {
    statusCode: { type: 'integer' },
    error: { type: 'string' },
    message: { type: 'string' },
  },
  required: ['statusCode', 'error', 'message'],
};
//
// // Export route schemas
// export const schemas = {
//   getCart: {
//     response: {
//       200: cartSchema,
//       400: errorSchema,
//       401: errorSchema,
//       500: errorSchema,
//     },
//   },
//
//   getCartTotal: {
//     response: {
//       200: { type: 'number' },
//       400: errorSchema,
//       401: errorSchema,
//       500: errorSchema,
//     },
//   },
//
//   getCartProducts: {
//     response: {
//       200: cartProductsSchema,
//       400: errorSchema,
//       401: errorSchema,
//       500: errorSchema,
//     },
//   },
//
//   addProductToCart: {
//     body: {
//       type: 'object',
//       properties: {
//         productId: { type: 'string' },
//         quantity: { type: 'integer', minimum: 1 },
//       },
//       required: ['productId', 'quantity'],
//     },
//     response: {
//       200: cartSchema,
//       400: errorSchema,
//       401: errorSchema,
//       404: errorSchema,
//       500: errorSchema,
//     },
//   },
//
//   updateCartProduct: {
//     params: {
//       type: 'object',
//       properties: {
//         productId: { type: 'string' },
//       },
//       required: ['productId'],
//     },
//     body: {
//       type: 'object',
//       properties: {
//         quantity: { type: 'integer', minimum: 1 },
//       },
//       required: ['quantity'],
//     },
//     response: {
//       200: cartProductSchema,
//       400: errorSchema,
//       401: errorSchema,
//       404: errorSchema,
//       500: errorSchema,
//     },
//   },
//
//   removeCartProduct: {
//     params: {
//       type: 'object',
//       properties: {
//         productId: { type: 'string' },
//       },
//       required: ['productId'],
//     },
//     response: {
//       200: cartSchema,
//       400: errorSchema,
//       401: errorSchema,
//       404: errorSchema,
//       500: errorSchema,
//     },
//   },
// };
