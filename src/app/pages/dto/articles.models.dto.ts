export interface ArticlesDto {
	 id:number;
     libArt : string;
     niveauAlert : number;
     caracteristique : string;
     stock : number;
     type : string;
     etat :string;
     commentaire : string;
     marqueId: number;
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
     marqueId: number;
     categorieId: number;
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
 