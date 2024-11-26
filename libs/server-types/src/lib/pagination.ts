export interface ApiPaginatedResponse<T> {
  data: T[];
  metadata: {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface ApiPaginationQuery {
  page: number;
  limit: number;
  sort: string;
  order: 'asc' | 'desc';
}
