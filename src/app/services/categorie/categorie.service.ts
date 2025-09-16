import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategorieDto, CategorieResponseDto, PageResponse } from '../../pages/dto/categorie.models.dto';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {private apiUrl = 'http://localhost:8080/api/categories'; 

  constructor(private http: HttpClient) {}

  createCategorie(dto: CategorieDto): Observable<CategorieResponseDto> {
    return this.http.post<CategorieResponseDto>(this.apiUrl, dto);
  }

  getAllCategories(): Observable<CategorieResponseDto[]> {
    return this.http.get<CategorieResponseDto[]>(this.apiUrl);
  }

  getAllCategorieByPage(page: number, size: number): Observable<PageResponse<CategorieResponseDto>> {
      return this.http.get<PageResponse<CategorieResponseDto>>(`${this.apiUrl}/page?page=${page}&size=${size}`);
    }

  getCategorieById(id: number): Observable<CategorieResponseDto> {
    return this.http.get<CategorieResponseDto>(`${this.apiUrl}/${id}`);
  }
  updateCategorie(id: number, dto: CategorieResponseDto): Observable<CategorieResponseDto> {
    return this.http.put<CategorieResponseDto>(`${this.apiUrl}/${id}`, dto);
  }

  deleteCategorie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
