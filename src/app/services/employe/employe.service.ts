import { inject, Injectable } from '@angular/core';
import { EmployeDto, EmployeResponseDto, PageResponse } from '../../pages/dto/employe.models.dto';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/employes'; 

  createEmploye(employe: EmployeDto): Observable<EmployeResponseDto> {
    return this.http.post<EmployeResponseDto>(`${this.apiUrl}`, employe);
  }

  getAllEmploye(): Observable<EmployeResponseDto[]> {
    return this.http.get<EmployeResponseDto[]>(`${this.apiUrl}`);
  }

  getEmployeById(id: number): Observable<EmployeResponseDto> {
    return this.http.get<EmployeResponseDto>(`${this.apiUrl}/by-id/${id}`);
  }

  updateEmploye(id: number, employe: EmployeDto): Observable<EmployeResponseDto> {
    return this.http.put<EmployeResponseDto>(`${this.apiUrl}/${id}`, employe);
  }

  deleteEmploye(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

 getAllEmployeByPage(page: number = 0, size: number = 10): Observable<PageResponse<EmployeResponseDto>> {
  return this.http.get<PageResponse<EmployeResponseDto>>(
    `${this.apiUrl}/page?page=${page}&size=${size}`
  );
}

}
