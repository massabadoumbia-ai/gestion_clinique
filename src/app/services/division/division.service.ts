import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DivisionDto, DivisionResponseDto, PageResponse } from '../../pages/dto/division.models.dto';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/divisions';

  createDivision(division: DivisionDto): Observable<DivisionResponseDto> {
    return this.http.post<DivisionResponseDto>(`${this.apiUrl}/create`, division);
  }

  getAllDivision(): Observable<DivisionResponseDto[]> {
    return this.http.get<DivisionResponseDto[]>(`${this.apiUrl}/list`);
  }

  getDivisionById(id: number): Observable<DivisionResponseDto> {
    return this.http.get<DivisionResponseDto>(`${this.apiUrl}/${id}`);
  }

  updateDivision(id: number, division: DivisionDto): Observable<DivisionResponseDto> {
    return this.http.put<DivisionResponseDto>(`${this.apiUrl}/${id}/update`, division);
  }

  deleteDivision(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/delete`);
  }

  getAllDivisionByPage(page: number = 0, size: number = 10): Observable<PageResponse<DivisionResponseDto>> {
    return this.http.get<PageResponse<DivisionResponseDto>>(
      `${this.apiUrl}/page?page=${page}&size=${size}`
    );
  }

   searchDivisions(term: string): Observable<DivisionResponseDto[]> {
    return this.http.get<DivisionResponseDto[]>(`${this.apiUrl}/search?term=${term}`);
  }
}