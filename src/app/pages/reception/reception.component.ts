import { Component, inject, OnInit } from '@angular/core';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { NzPaginationComponent } from 'ng-zorro-antd/pagination';
import { ReceptionResponseDto } from '../dto/reception.models.dto';
import { EmployeResponseDto } from '../dto/employe.models.dto';
import { FournisseurResponseDto } from '../dto/fournisseur.models.dto';
import { ReceptionService } from '../../services/reception/reception.service';
import { EmployeService } from '../../services/employe/employe.service';
import { FournisseurService } from '../../services/fournisseur/fournisseur.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HasPermissionDirective } from '../../services/directives/has-permissions';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-reception',
  standalone: true,
  imports: [
    NzPaginationComponent,
    CommonModule,
    HasPermissionDirective,
    FormsModule,
    NzInputModule,
    NzButtonModule
  ],
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.css']
})
export class ReceptionComponent implements OnInit {

  receptionList: ReceptionResponseDto[] = [];
  filteredReception: ReceptionResponseDto[] = [];
  filters = {
    numReception: '',
    dateContrat: '',
    dateReception: '',
    employeId: null as number | null,
    fournisseurId: null as number | null
  };

  employe: EmployeResponseDto[] = [];
  fournisseur: FournisseurResponseDto[] = [];

  size: NzButtonSize = 'small';
  totalElements: number = 0;
  pageNumber: number = 0;
  sizeNumber: number = 10;

  private receptionService = inject(ReceptionService);
  private employeService = inject(EmployeService);
  private fournisseurService = inject(FournisseurService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadEmployes();
    this.loadFournisseurs();
    this.getAllReceptionByPage(this.pageNumber, this.sizeNumber);
  }

  loadEmployes() {
    this.employeService.getAllEmploye().subscribe(data => this.employe = data);
  }

  loadFournisseurs() {
    this.fournisseurService.getAllFournisseur().subscribe(data => this.fournisseur = data);
  }

  getAllReceptionByPage(page: number, size: number) {
    this.receptionService.getAllReceptionByPage(page, size).subscribe({
      next: (response) => {
        this.receptionList = response.content;
        this.totalElements = response.totalElements;
        this.filteredReception = this.receptionList;
      },
      error: (err) => console.error('Erreur lors du chargement des réceptions : ', err)
    });
  }

  applyFilters() {
    const payload = {
      numReception: this.filters.numReception || null,
      dateContrat: this.filters.dateContrat || null,
      dateReception: this.filters.dateReception || null,
      employeId: this.filters.employeId || null,
      fournisseurId: this.filters.fournisseurId || null
    };

    this.receptionService.search(payload, this.pageNumber, this.sizeNumber).subscribe({
      next: (response) => {
        this.receptionList = response.content;
        this.totalElements = response.totalElements;
      },
      error: (err) => console.error('Erreur lors de la recherche :', err)
    });
  }

  resetFilters() {
    this.filters = {
      numReception: '',
      dateContrat: '',
      dateReception: '',
      employeId: null,
      fournisseurId: null
    };
    this.applyFilters();
  }

  onCreateReception() {
    this.router.navigate(['/admin/dashboard/reception-add']);
  }

  onDetail(reception: ReceptionResponseDto) {
    this.router.navigate(['/admin/dashboard/reception-detail', reception.id]);
  }

  onEdit(reception: ReceptionResponseDto) {
    this.router.navigate(['/admin/dashboard/reception-edit', reception.id]);
  }

  onDelete(reception: ReceptionResponseDto) {
    if (confirm(`Voulez-vous vraiment supprimer la réception avec l'ID ${reception.id} ?`)) {
      this.receptionService.deleteReception(reception.id!).subscribe({
        next: () => this.getAllReceptionByPage(this.pageNumber, this.sizeNumber),
        error: (err) => console.error('Erreur lors de la suppression :', err)
      });
    }
  }

  navigateToPage(event: number) {
    this.pageNumber = event - 1;
    this.applyFilters();
  }
}
