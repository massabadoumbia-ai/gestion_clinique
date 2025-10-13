import { Component, inject, OnInit } from '@angular/core';
import { DivisionResponseDto } from '../dto/division.models.dto';
import { Router } from '@angular/router';
import { DivisionService } from '../../services/division/division.service';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { NzPaginationComponent } from "ng-zorro-antd/pagination";
import { HasPermissionDirective } from '../../services/directives/has-permissions';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-division',
  standalone: true,
  imports: [NzPaginationComponent,HasPermissionDirective ,FormsModule,
                FormsModule,
                NzInputModule,
                NzButtonModule,],
  templateUrl: './division.component.html',
  styleUrl: './division.component.css'
})
export class DivisionComponent implements OnInit {

  divisionList: DivisionResponseDto[] = [];
    filteredDivision: DivisionResponseDto[] = [];
    
      filters = {
        nom: '',
      }
    size: NzButtonSize  = 'small';
  totalElements: number = 0;
  pageNumber: number = 0;  
  sizeNumber: number = 10;

  private router = inject(Router);

  constructor(private divisionService: DivisionService) {}

  ngOnInit(): void {
    this.getAllDivisionByPage(this.pageNumber, this.sizeNumber); 
  }

  applyFilters(): void {
  const { nom } = this.filters;

  this.filteredDivision = this.divisionList.filter(division =>
    !nom || division.nom?.toLowerCase().includes(nom.toLowerCase())
  );
}

  getAllDivisionByPage(page: number, size: number) {
   this.divisionService.getAllDivisionByPage(page, size).subscribe({
  next: (response) => {
    console.log('PAGES ELEMENTS :: ', response);
     this.filteredDivision = response.content; 
    this.divisionList = response.content;
    this.totalElements = response.totalElements;
      },
      error: (err) => console.error('Erreur lors de la récupération des divisions :', err)
    });
  }

  onCreateDivision() {
    this.router.navigate(['/admin/dashboard/division-add']);
    console.log('Créer une nouvelle division');
  }


  onEdit(division: DivisionResponseDto) {
    this.router.navigate(['/admin/dashboard/division-edit', division.id]);
    console.log('Modifier :', division);
  }

  onDelete(division: DivisionResponseDto) {
    if (confirm(`Voulez-vous vraiment supprimer la division "${division.nom}" ?`)) {
      this.divisionService.deleteDivision(division.id!).subscribe({
        next: () => {
          console.log(`Division "${division.nom}" supprimée`);
          this.getAllDivisionByPage(this.pageNumber, this.sizeNumber);
        },
        error: (err) => console.error('Erreur lors de la suppression :', err)
      });
    } else {
      console.log('Suppression annulée');
    }
  }

  navigateToPage(event: number) {
    console.log('TO PAGE :: ', event);
    this.getAllDivisionByPage(event - 1, this.sizeNumber); 
  }
}