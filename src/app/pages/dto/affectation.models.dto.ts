import { ArticlesDto, ArticlesResponseDto } from "./articles.models.dto";
import { EmployeDto, EmployeResponseDto } from "./employe.models.dto";

export interface AffectationArticlesDto{
     id?: number;              
  dateDebut: string;        
  dateFin: string;
  nbrArticle: number;
  articleId: ArticlesDto;   
  employeId: EmployeDto; 

}
export interface AffectationArticlesResponseDto{
     id?: number;              
  dateDebut: string;        
  dateFin: string;
  nbrArticle: number;   
  employeNom: String;
   employePrenom: String; 
   libArt: string;
   employeId: number;
   articleId: number;
   employeEmail: string;      
	 employePoste: string;      
	 employeDivision: string;
   etat: string;

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
