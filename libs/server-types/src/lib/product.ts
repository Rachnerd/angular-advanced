interface ApiRating {
  rate: number;
  count: number;
}
export type ApiProductType = 'default' | 'limited' | 'out-of-stock';

export interface ApiProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ApiRating;
  type: ApiProductType;
}

export type ApiSortByField = 'price' | 'rating' | 'title';
export type ApiSortOrder = 'asc' | 'desc';

export interface ApiProductSearchQueryType {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  type?: ApiProductType;
  sortBy?: ApiSortByField;
  sortOrder?: ApiSortOrder;
}
