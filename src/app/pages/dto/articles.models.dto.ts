export interface ArticlesDto {
	 id:number;
     libArt : string;
     niveauAlert : number;
     caracteristique : string;
     stock : number;
     type : string;
     etat :string;
     commentaire : string;
     image: string;
     marqueId: number;
      marqueNom: string;
    categorieNom: string;
     categorieId: number;
     
}

 export interface ArticlesResponseDto {
	 id:number;
     libArt : string;
     niveauAlert : number;
     caracteristique : string;
     stock : number;
     type : string;
     etat :string;
     commentaire : string;
    imageUrl: string ;
    imageFileType?: string ;
    imageData?: string ;
     marqueId: number;
     categorieId: number;
     marqueNom: string;
    categorieNom: string;
}
export interface ResponseArticlesDto {
  content: ArticlesResponseDto[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}
export interface ArticlesSearchRequestDto{
   libArt : string;
    type : string;
     etat :string;
          marqueId: number;
     categorieId: number;

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
 