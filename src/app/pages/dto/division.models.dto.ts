export interface PageResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}
export interface  DivisionResponseDto{
    id:number;
   nom:string ;
   description:string;
    
};
export interface  DivisionDto{
    id:number;
   nom:string ;
    
}
  