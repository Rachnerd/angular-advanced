import { Static, Type } from '@sinclair/typebox';

export const SearchQuerySchema = Type.Object({
  page: Type.Optional(Type.Number({ minimum: 1, default: 1 })),
  limit: Type.Optional(Type.Number({ minimum: 1, maximum: 100, default: 20 })),
  search: Type.Optional(Type.String()),
  category: Type.Optional(Type.String()),
  minPrice: Type.Optional(Type.Number({ minimum: 0 })),
  maxPrice: Type.Optional(Type.Number({ minimum: 0 })),
  type: Type.Optional(
    Type.Union([
      Type.Literal('default'),
      Type.Literal('limited'),
      Type.Literal('out-of-stock'),
    ]),
  ),
  sortBy: Type.Optional(
    Type.Union([
      Type.Literal('price'),
      Type.Literal('rating'),
      Type.Literal('title'),
    ]),
  ),
  sortOrder: Type.Optional(
    Type.Union([Type.Literal('asc'), Type.Literal('desc')]),
  ),
});

export type SearchQueryType = Static<typeof SearchQuerySchema>;
