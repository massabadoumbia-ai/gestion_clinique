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

  createReception(formData: FormData): Observable<ReceptionResponseDto> {
  return this.http.post<ReceptionResponseDto>('http://localhost:8080/api/receptions/create', formData);
}

  getAllReception(): Observable<ReceptionResponseDto[]> {
    return this.http.get<ReceptionResponseDto[]>(`${this.apiUrl}/list`);
  }

  getAllReceptionByPage(page: number, size: number): Observable<PageResponse<ReceptionResponseDto>> {
    return this.http.get<PageResponse<ReceptionResponseDto>>(
      `${this.apiUrl}/page?page=${page}&size=${size}`
    );
  }

  getReceptionById(id: number): Observable<ReceptionResponseDto> {
    return this.http.get<ReceptionResponseDto>(`${this.apiUrl}/${id}`);
  }

  updateReception(id: number, formData: FormData) {
  return this.http.put<any>(`http://localhost:8080/api/receptions/${id}/update`, formData);
}


  deleteReception(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/delete`);
  }

  Reception(formData: FormData): Observable<ReceptionResponseDto> {
  return this.http.post<ReceptionResponseDto>('http://localhost:8080/api/receptions/create', formData);
}
getPvFileBlob(id: number): Observable<Blob> {
  return this.http.get(`${this.apiUrl}/download/${id}`, { responseType: 'blob' });
}


}