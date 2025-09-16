import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageResponse, ReceptionResponseDto } from '../../pages/dto/reception.models.dto';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ReceptionService {
  
  private apiUrl = 'http://localhost:8080/api/receptions'; 

  constructor(private http: HttpClient) {}

  createReception(dto: ReceptionResponseDto): Observable<ReceptionResponseDto> {
    return this.http.post<ReceptionResponseDto>(`${this.apiUrl}`, dto);
  }

  getAllReception(): Observable<ReceptionResponseDto[]> {
    return this.http.get<ReceptionResponseDto[]>(`${this.apiUrl}`);
  }

  getAllReceptionByPage(page: number, size: number): Observable<PageResponse<ReceptionResponseDto>> {
    return this.http.get<PageResponse<ReceptionResponseDto>>(
      `${this.apiUrl}/page?page=${page}&size=${size}`
    );
  }

  getReceptionById(id: number): Observable<ReceptionResponseDto> {
    return this.http.get<ReceptionResponseDto>(`${this.apiUrl}/${id}`);
  }

  updateReception(id: number, dto: ReceptionResponseDto): Observable<ReceptionResponseDto> {
    return this.http.put<ReceptionResponseDto>(`${this.apiUrl}/${id}`, dto);
  }

  deleteReception(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}