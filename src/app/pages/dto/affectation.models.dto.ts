import { ArticlesDto, ArticlesResponseDto } from "./articles.models.dto";
import { EmployeDto, EmployeResponseDto } from "./employe.models.dto";

export interface AffectationArticlesDto{
     id?: number;              
  dateDebut: string;        
  dateFin: string;
  nbrArticle: number;
  articlesId: ArticlesDto;   
  employeId: EmployeDto; 

}
export interface AffectationArticlesResponseDto{
     id?: number;              
  dateDebut: string;        
  dateFin: string;
  nbrArticle: number;
  articlesId: number;   
  employeId: number; 

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
