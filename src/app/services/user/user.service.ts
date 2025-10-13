import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRequestDto, UserResponseDto } from '../../pages/dto/user.modols.dto';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string, confirmPassword: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reset-password`, {
      token,
      newPassword,
      confirmPassword
    });
  }

  createUser(user: UserRequestDto): Observable<UserResponseDto> {
    return this.http.post<UserResponseDto>(`${this.apiUrl}/create`, user);
  }

  getAllUsers(): Observable<UserResponseDto[]> {
    return this.http.get<UserResponseDto[]>(`${this.apiUrl}/list`);
  }
  getAllUsersByPage(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/page?page=${page}&size=${size}`);
  }

  getUserById(id: number): Observable<UserResponseDto> {
    return this.http.get<UserResponseDto>(`${this.apiUrl}/by-id/${id}`);
  }

  updateUser(id: number, user: UserResponseDto): Observable<UserResponseDto> {
    return this.http.put<UserResponseDto>(`${this.apiUrl}/update/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  getAllRoles(): Observable<string[]> {
  return this.http.get<string[]>('http://localhost:8080/api/roles/list');
}
}
