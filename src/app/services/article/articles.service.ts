import { Injectable } from '@angular/core';
import { ArticlesDto, ArticlesResponseDto } from '../../pages/dto/articles.models.dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService { 
  private apiUrl = 'http://localhost:8080/api/articles';
  private apiUrlMarque = 'http://localhost:8080/api/marques';
  private apiUrlCategorie = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) {}

  createArticle(formData: FormData): Observable<ArticlesResponseDto> {
    return this.http.post<ArticlesResponseDto>(`${this.apiUrl}/create`, formData);
  }


  getAllArticles(): Observable<ArticlesResponseDto[]> {
    return this.http.get<ArticlesResponseDto[]>(`${this.apiUrl}/list`);
  }

  getAllArticlesByPage(page: number, size: number): Observable<{ content: ArticlesResponseDto[], totalElements: number }> {
  return this.http.get<{ content: ArticlesResponseDto[], totalElements: number }>(
    `${this.apiUrl}/page?page=${page}&size=${size}`
  );
}


  getArticlesById(id: number): Observable<ArticlesResponseDto> {
    return this.http.get<ArticlesResponseDto>(`${this.apiUrl}/${id}`);
}


  updateArticles(id: number, formData: FormData): Observable<ArticlesResponseDto> {
    return this.http.put<ArticlesResponseDto>(`${this.apiUrl}/${id}/update`, formData);
  }

  getMarques(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlMarque}/list`); 
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlCategorie}/list`);
  }

  deleteArticle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}

