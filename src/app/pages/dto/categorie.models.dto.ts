export interface CategorieResponseDto{
    id?: number;
  nom: string;
  articlesId: number;
}
export interface CategorieDto{
    id?: number;
  nom: string;
   articlesId?: number[];
}

export interface PageResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}