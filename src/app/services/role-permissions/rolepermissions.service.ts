import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RolePermissionsDto, RolePermissionsResponseDto } from '../../pages/dto/rolepermissions.models.dto';


@Injectable({
  providedIn: 'root'
})
export class RolePermissionsService {

  private apiUrl = 'http://localhost:8080/api/role-permissions';

  constructor(private http: HttpClient) {}

  getPermissions(roleName: string): Observable<RolePermissionsResponseDto> {
    return this.http.get<RolePermissionsResponseDto>(`${this.apiUrl}/permissions/${roleName}`);
  }

  getPermissionsNotInRole(roleName: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/permissions/missing/${roleName}`);
  }

  assignPermissions(dto: RolePermissionsDto): Observable<RolePermissionsResponseDto> {
    return this.http.post<RolePermissionsResponseDto>(`${this.apiUrl}/assign`, dto);
  }

  removePermission(roleName: string, permissionName: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete?roleName=${roleName}&permissionName=${permissionName}`);
  }
}
