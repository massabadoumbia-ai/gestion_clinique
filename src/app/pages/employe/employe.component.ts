import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { Router } from '@angular/router';
import { EmployeResponseDto } from '../dto/employe.models.dto';
import { EmployeService } from '../../services/employe/employe.service';
import { HasPermissionDirective } from '../../services/directives/has-permissions';
import { DivisionResponseDto } from '../dto/division.models.dto';

@Component({
  selector: 'app-employe',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzButtonModule,
    NzPaginationModule,
    HasPermissionDirective
  ],
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent implements OnInit {

  employeList: EmployeResponseDto[] = [];
  filteredEmploye: EmployeResponseDto[] = [];

  filters = {
    nom: '',
    prenom: '',
    poste: '',
    divisionNom: '' 
  };

  division: string[] = []; 

  size: NzButtonSize = 'small';
  totalElements: number = 0;
  pageNumber: number = 0;
  sizeNumber: number = 10;

  private router = inject(Router);

  constructor(private employeService: EmployeService) {}

  ngOnInit(): void {
    this.getAllEmployeByPage(this.pageNumber, this.sizeNumber); 
    this.loadDivision();
  }

  loadDivision(): void {
    this.employeService.getAllEmploye().subscribe({
      next: (employes) => {
        this.division = Array.from(
          new Set(employes.map(e => e.divisionNom).filter(d => !!d))
        );
      },
      error: (err) => console.error('Erreur lors du chargement des divisions', err)
    });
  }

  applyFilters(): void {
    const { nom, prenom, poste, divisionNom } = this.filters;

    this.filteredEmploye = this.employeList.filter(e =>
      (!nom || e.nom?.toLowerCase().includes(nom.toLowerCase())) &&
      (!prenom || e.prenom?.toLowerCase().includes(prenom.toLowerCase())) &&
      (!poste || e.poste?.toLowerCase().includes(poste.toLowerCase())) &&
      (!divisionNom || e.divisionNom === divisionNom)
    );
  }

  getAllEmployeByPage(page: number, size: number): void {
    this.employeService.getAllEmployeByPage(page, size).subscribe({
      next: (response: { content: EmployeResponseDto[], totalElements: number }) => {
        this.employeList = response.content;
        this.filteredEmploye = response.content; 
        this.totalElements = response.totalElements;
      },
      error: (err) => console.error("Erreur lors de la récupération des employés :", err)
    });
  }

  onCreateEmploye(): void {
    this.router.navigate(['/admin/dashboard/employe-add']);
  }

  onDetail(employe: EmployeResponseDto): void {
    this.router.navigate(['/admin/dashboard/employe-detail', employe.id]);
  }

  onEdit(employe: EmployeResponseDto): void {
    this.router.navigate(['/admin/dashboard/employe-edit', employe.id]);
  }

  onDelete(employe: EmployeResponseDto): void {
    if (confirm(`Voulez-vous vraiment supprimer l'employé "${employe.nom} ${employe.prenom}" ?`)) {
      this.employeService.deleteEmploye(employe.id!).subscribe({
        next: () => this.getAllEmployeByPage(this.pageNumber, this.sizeNumber),
        error: (err) => console.error('Erreur lors de la suppression :', err)
      });
    }
  }

  navigateToPage(event: number): void {
    this.getAllEmployeByPage(event - 1, this.sizeNumber);
  }
}
