export interface ReceptionRequestDto {
  dateReception: string;
  employeId?: number;
  fournisseurId?: number;
   pv : string;
   fournisseurNom:string;
  employeNom:string;
}

export interface ReceptionResponseDto {
  id: number;
  numReception: string;
  dateContrat: string;     
  dateReception: string;
  nbrArticle: number;
  employeId?: number;
  employeNom?: string;
  fournisseurId?: number;
  fournisseurNom?: string;
  pv?: string;             
  pvFileName?: string;    
  pvFileType?: string;  
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
