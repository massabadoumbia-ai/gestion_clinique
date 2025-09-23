import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MarqueResponseDto } from '../../pages/dto/marque.models.dto';

export interface MarqueDto {
  id: number;
  nom: string;
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

@Injectable({
  providedIn: 'root'
})
export class MarqueService {

  private apiUrl = 'http://localhost:8080/api/marques'; 

  constructor(private http: HttpClient) { }

  createMarque(marque: { nom: string }): Observable<MarqueResponseDto> {
    return this.http.post<MarqueResponseDto>(`${this.apiUrl}/create`, marque);
  }

 getAllMarques(): Observable<MarqueResponseDto[]> {
  return this.http.get<MarqueResponseDto[]>(`${this.apiUrl}/list`);
}

  getAllMarqueByPage(page: number, size: number): Observable<PageResponse<MarqueResponseDto>> {
    return this.http.get<PageResponse<MarqueResponseDto>>(`${this.apiUrl}/page?page=${page}&size=${size}`);
  }

  getMarqueById(id: number): Observable<MarqueResponseDto> {
    return this.http.get<MarqueResponseDto>(`${this.apiUrl}/${id}`);
  }

  updateMarque(id: number, marque: { nom: string }): Observable<MarqueResponseDto> {
    return this.http.put<MarqueResponseDto>(`${this.apiUrl}/${id}/update`, marque);
  }

  deleteMarque(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/delete`);
  }
}
