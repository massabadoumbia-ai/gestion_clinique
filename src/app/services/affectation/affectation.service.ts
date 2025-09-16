import { Injectable } from '@angular/core';
import { AffectationArticlesResponseDto, PageResponse } from '../../pages/dto/affectation.models.dto';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AffectationService {

  private apiUrl = 'http://localhost:8080/api/affectation-articles';

  constructor(private http: HttpClient) {}

  createAffectation(dto: AffectationArticlesResponseDto): Observable<AffectationArticlesResponseDto> {
    return this.http.post<AffectationArticlesResponseDto>(`${this.apiUrl}`, dto);
  }

  getAllAffectation(): Observable<AffectationArticlesResponseDto[]> {
    return this.http.get<AffectationArticlesResponseDto[]>(`${this.apiUrl}`);
  }

  getAffectationById(id: number): Observable<AffectationArticlesResponseDto> {
    return this.http.get<AffectationArticlesResponseDto>(`${this.apiUrl}/${id}`);
  }

  updateAffectation(id: number, dto: AffectationArticlesResponseDto): Observable<AffectationArticlesResponseDto> {
    return this.http.put<AffectationArticlesResponseDto>(`${this.apiUrl}/${id}`, dto);
  }

  deleteAffectation(id: number): Observable<AffectationArticlesResponseDto> {
    return this.http.delete<AffectationArticlesResponseDto>(`${this.apiUrl}/${id}`);
  }

  getAllAffectationByPage(page: number, size: number): Observable<{ content: AffectationArticlesResponseDto[], totalElements: number }> {
  return this.http.get<{ content: AffectationArticlesResponseDto[], totalElements: number }>(
    `${this.apiUrl}/page?page=${page}&size=${size}`
  );
}

}