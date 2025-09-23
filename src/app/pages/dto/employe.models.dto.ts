export interface EmployeDto {
	 id:number;
    nom : string;
     prenom : string;
     poste: string;
      email: string;
     receptionid? : number;
     
}

 export interface EmployeResponseDto {
	 id:number;
     nom : string;
     prenom : string;
     poste: string;
     email: string;
      division: string;
      receptionid? : number;

     
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