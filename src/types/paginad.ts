export interface IPaginatedDocs<DocsType> {
  data: DocsType[];
  total: number;
  currentPage: number;
  perPage: number;
  lastPage: number;
  prev: number | null;
  next: number | null;
}

export interface IPaginationParams {
  currentPage?: string | number;
  perPage?: string | number;
}
