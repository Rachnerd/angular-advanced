import type { ApiProduct } from './product';

export interface ApiCartEntry {
  productId: string;
  quantity: number;
}

export interface ApiCart {
  userId: string;
  entries: ApiCartEntry[];
}

export interface ApiCartProduct {
  product: ApiProduct;
  quantity: number;
}

export interface ApiCartProducts {
  products: ApiCartProduct[];
  total: number;
}
