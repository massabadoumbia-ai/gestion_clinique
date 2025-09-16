export interface MarqueResponseDto{
    id?: number;
  nom: string;
  articlesId: number;
}
export interface MarqueDto{
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