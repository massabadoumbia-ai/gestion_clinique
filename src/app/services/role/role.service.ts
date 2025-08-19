import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoleDto, RoleResponseDto } from '../../pages/dto/role.models.dto';



@Injectable({
  providedIn: 'root'
})
export class RoleService {
  
  private apiUrl = 'http://localhost:8080/api/roles';

  constructor(private http: HttpClient) {}

 
getAllRoles(): Observable<RoleResponseDto[]> {
    return this.http.get<RoleResponseDto[]>(`${this.apiUrl}/list`);
  }


  createRole(role: RoleDto): Observable<any> {
    return this.http.post<RoleResponseDto>(`${this.apiUrl}/create`, role);
  }

   getAllRoleByPage(page: number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/page?page=${page}&size=${size}`);
  }

 
  getAll(): Observable<RoleResponseDto[]> {
    return this.http.get<RoleResponseDto[]>(`${this.apiUrl}/list`);
  }


 updateRole(id: number, role: RoleResponseDto): Observable<RoleResponseDto> {
  return this.http.put<RoleResponseDto>(`${this.apiUrl}/update?id=${id}`, role);
}


  
  deleteRole(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete?id=${id}`);
  }

   getRoleById(id: number): Observable<RoleResponseDto> {
    return this.http.get<RoleResponseDto>(`${this.apiUrl}/by-id/${id}`);
  }

  getPermissionsByRole(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/permissions`);
  }

  updateRolePermissions(roleId: number, permissionIds: string[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/${roleId}/permissions`, { permissions: permissionIds });
  }
}
