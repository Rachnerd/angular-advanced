import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { PRODUCT_DATA } from '../data/product.data';
import {
  ApiPaginatedResponse,
  ApiProduct,
  ApiProductSearchQueryType,
} from '@angular-advanced/server-types';
import { getProductsSchema } from '../schemas/products/get-products.schema';
import { getProductSchema } from '../schemas/products/get-product.schema';
import { ProductsService } from '../services/product.service';

interface RouteParams {
  id: string;
}

const productsService = new ProductsService();

export default async function (fastify: FastifyInstance) {
  fastify.get<{ Querystring: ApiProductSearchQueryType }>(
    '/products',
    {
      schema: getProductsSchema,
      preHandler: [
        // authenticate,
        // checkRole(['admin']),
      ],
    },
    async (
      request: FastifyRequest<{ Querystring: ApiProductSearchQueryType }>,
      reply,
    ): Promise<ApiPaginatedResponse<ApiProduct>> => {
      try {
        return await productsService.searchProducts(request.query);
      } catch (error) {
        request.log.error(error);
        return reply.status(500).send({
          error: 'Internal Server Error',
          message: 'An error occurred while processing your request',
        });
      }
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
