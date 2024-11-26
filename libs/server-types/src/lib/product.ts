interface ApiRating {
  rate: number;
  count: number;
}

export interface ApiProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ApiRating;
  type: 'default' | 'limited' | 'out-of-stock';
}
