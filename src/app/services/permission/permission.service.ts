import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PermissionResponseDto } from '../../pages/dto/permission.models.dto';



@Injectable({
  providedIn: 'root' 
})
export class PermissionService{
 

  private apiUrl = 'http://localhost:8080/api/permissions';

  constructor(private http: HttpClient) {}

 
  getAllPermissions(): Observable<PermissionResponseDto[]> {
    return this.http.get<PermissionResponseDto[]>(`${this.apiUrl}/list`);
  }
 getAllPermissionByPage(page: number, size: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/page?page=${page}&size=${size}`);
   
  }

   getPermissionById(id: number): Observable<PermissionResponseDto> {
      return this.http.get<PermissionResponseDto>(`${this.apiUrl}/by-id/${id}`);
    }
  
  createPermission(dto: PermissionResponseDto): Observable<PermissionResponseDto> {
    return this.http.post<PermissionResponseDto>(`${this.apiUrl}/create`, dto);
  }

  
  updatePermission(id: number, dto: PermissionResponseDto): Observable<PermissionResponseDto> {
    return this.http.put<PermissionResponseDto>(`${this.apiUrl}/update/${id}`, dto);
  }

 
  deletePermission(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

}
