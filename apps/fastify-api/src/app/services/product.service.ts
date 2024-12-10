import { InMemoryProductRepository } from '../repositories/product.repository';
import {
  ApiPaginatedResponse,
  ApiProduct,
  ApiProductSearchQueryType,
} from '@angular-advanced/server-types';

export class ProductsService {
  private productRepository = new InMemoryProductRepository();

  async searchProducts(
    query: ApiProductSearchQueryType,
  ): Promise<ApiPaginatedResponse<ApiProduct>> {
    const { page = 1, limit = 20 } = query;

    const { products, totalItems } =
      await this.productRepository.searchProducts(query);

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalItems / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      data: products,
      metadata: {
        totalItems,
        itemsPerPage: limit,
        currentPage: page,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      },
    };
  }
}
