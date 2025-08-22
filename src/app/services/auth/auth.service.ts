import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


export interface UserLoginDto {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
   private helper = new JwtHelperService();
  

  constructor(private http: HttpClient) {}

  login(credentials: UserLoginDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

 getUserPermissions(): string[] {
  const token = this.getToken(); 
  if (!token) return [];

  const decoded = this.helper.decodeToken(token);
  if (decoded && decoded.permissions) {
    return decoded.permissions; 
  }
  return [];
  }

 hasPermission(permission: string): boolean {
    const permissions = this.getUserPermissions();
    return permissions.includes(permission);
  }
}
