import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from '../../pages/dto/user.modols.dto';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';
 

  constructor(private http: HttpClient) {}

  createUser(user: UserDto): Observable<UserDto> {
    console.log("user ",user)
    return this.http.post<UserDto>(`${this.apiUrl}/create`, user);
  }

  getAllUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.apiUrl}/list`);
  }
  
 getAllUsersByPage(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/page?page=${page}&size=${size}`);
  }

   getUserById(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiUrl}/by-id/${id}`);
  }

  updateUser(id: number, user: UserDto): Observable<UserDto> {
    return this.http.put<UserDto>(`${this.apiUrl}/update/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}

