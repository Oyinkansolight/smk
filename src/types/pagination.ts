export interface PaginatedData<T> {
  data: T[];
  paging: {
    totalPage: number;
    currentPage: number;
  };
}
