import { Component, inject, OnInit } from '@angular/core';
import { NzPaginationComponent } from "ng-zorro-antd/pagination";
import { EmployeResponseDto } from '../dto/employe.models.dto';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { Router } from '@angular/router';
import { EmployeService } from '../../services/employe/employe.service';

@Component({
  selector: 'app-employe',
  standalone: true,
  imports: [NzPaginationComponent],
  templateUrl: './employe.component.html',
  styleUrl: './employe.component.css'
})
export class EmployeComponent implements OnInit {

  employeList: EmployeResponseDto[] = [];
  size: NzButtonSize  = 'small';
  totalElements: number = 0;
  pageNumber: number = 0;
  sizeNumber: number = 10;

  private router = inject(Router);

  constructor(private employeService: EmployeService) {}

  ngOnInit(): void {
    this.getAllEmployeByPage(this.pageNumber, this.sizeNumber); 
  }

  getAllEmployeByPage(page: number, size: number) {
    this.employeService.getAllEmployeByPage(page, size).subscribe({
      next: (response) => {
        console.log("PAGES ELEMENTS :: ", response);
        this.employeList = response.content;
        this.totalElements = response.totalElements;
      },
      error: (err) => console.error("Erreur lors de la récupération des employés :", err)
    });
  }

  onCreateEmploye() {
    this.router.navigate(['/admin/dashboard/employe-add']);
    console.log('Créer un nouvel employé');
  }

  onDetail(employe: EmployeResponseDto) {
    this.router.navigate(['/admin/dashboard/employe-detail', employe.id]);
    console.log('Afficher les détails de :', employe);
  }

  onEdit(employe: EmployeResponseDto) {
    this.router.navigate(['/admin/dashboard/employe-edit', employe.id]);
    console.log('Modifier :', employe);
  }

  onDelete(employe: EmployeResponseDto) {
    if (confirm(`Voulez-vous vraiment supprimer l'employé avec l'ID ${employe.id} ?`)) {
      this.employeService.deleteEmploye(employe.id!).subscribe({
        next: () => {
          console.log(`Employé avec ID ${employe.id} supprimé`);
          this.getAllEmployeByPage(this.pageNumber, this.sizeNumber);
        },
        error: (err) => console.error('Erreur lors de la suppression :', err)
      });
    } else {
      console.log('Suppression annulée');
    }
  }

  navigateToPage(event: number) {
    console.log('TO PAGE :: ', event);
    this.getAllEmployeByPage(event - 1, this.sizeNumber);
  }
}
