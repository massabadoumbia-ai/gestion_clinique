import { Injectable } from '@angular/core';
import { FournisseurResponseDto } from '../../pages/dto/fournisseur.models.dto';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  private apiUrl = 'http://localhost:8080/api/fournisseurs'; 

  constructor(private http: HttpClient) { }

  createFournisseur(fournisseur: FournisseurResponseDto): Observable<FournisseurResponseDto> {
    return this.http.post<FournisseurResponseDto>(`${this.apiUrl}/create`, fournisseur);
  }

  updateFournisseur(id: number, fournisseur:FournisseurResponseDto): Observable<FournisseurResponseDto> {
    return this.http.put<FournisseurResponseDto>(`${this.apiUrl}/${id}/update`, fournisseur);
  }

  deleteFournisseur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/delete`);
  }

  getFournisseurById(id: number): Observable<FournisseurResponseDto> {
    return this.http.get<FournisseurResponseDto>(`${this.apiUrl}/${id}`);
  }

  getAllFournisseur(): Observable<FournisseurResponseDto[]> {
    return this.http.get<FournisseurResponseDto[]>(`${this.apiUrl}/list`);
  }

  getAllFournisseurByPage(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/page?page=${page}&size=${size}`);
  }
}
