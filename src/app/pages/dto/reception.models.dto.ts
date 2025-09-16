export interface ReceptionRequestDto {
  dateReception: string;
  employeId?: number;
  fournisseurId?: number;
}

export interface ReceptionResponseDto {
  id: number;
  dateReception: string;
  employeId: string;
  fournisseurId: string;
  numReception: string;
  nbrArticle: number;
  dateContrat: string
}
export interface PageResponse<T> {
  content: T[];
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}
