import {
  ApiProduct,
  ApiProductSearchQueryType,
} from '@angular-advanced/server-types';
import { PRODUCT_DATA } from '../data/product.data';

export interface ProductRepository {
  searchProducts(query: ApiProductSearchQueryType): Promise<{
    products: ApiProduct[];
    totalItems: number;
  }>;
}
export class InMemoryProductRepository implements ProductRepository {
  private products = PRODUCT_DATA;

  async searchProducts(query: ApiProductSearchQueryType) {
    const {
      page = 1,
      limit = 20,
      search = '',
      category,
      minPrice,
      maxPrice,
      type,
      sortBy = 'title',
      sortOrder = 'asc',
    } = query;

    // Apply filters
    let filteredProducts = [...this.products];

    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower),
      );
    }

    if (category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === category,
      );
    }

    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice,
      );
    }

    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice,
      );
    }

    if (type) {
      filteredProducts = filteredProducts.filter(
        (product) => product.type === type,
      );
    }

    // Apply sorting
    filteredProducts.sort((a, b) => {
      if (sortBy === 'rating') {
        return sortOrder === 'asc'
          ? a.rating.rate - b.rating.rate
          : b.rating.rate - a.rating.rate;
      }

      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return bValue < aValue ? -1 : bValue > aValue ? 1 : 0;
      }
    });

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return {
      products: paginatedProducts,
      totalItems: filteredProducts.length,
    };
  }
}
