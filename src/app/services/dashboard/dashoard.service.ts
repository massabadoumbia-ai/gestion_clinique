import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { DashboardResponseDto, StockEvolutionDto } from '../../pages/dto/articles.models.dto';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://localhost:8080/api/dashboard';

  constructor(private http: HttpClient) {}

  getDashboard(): Observable<DashboardResponseDto[]> {
    return this.http.get<DashboardResponseDto[]>(this.apiUrl);
  }
  getStockEvolution(): Observable<StockEvolutionDto> {
  return this.http.get<StockEvolutionDto>('/api/dashboard/evolution');
}

}
