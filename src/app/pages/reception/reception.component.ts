import { Component, inject, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzPaginationComponent } from "ng-zorro-antd/pagination";
import { ReceptionResponseDto } from '../dto/reception.models.dto';
import { ReceptionService } from '../../services/reception/reception.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reception',
  standalone: true,
  imports: [NzPaginationComponent],
  templateUrl: './reception.component.html',
  styleUrl: './reception.component.css'
})
export class ReceptionComponent implements OnInit {

  receptionList: ReceptionResponseDto[] = [];
  size: NzButtonSize = 'small';
  totalElements: number = 0;
  pageNumber: number = 0;
  sizeNumber: number = 10;

  constructor(private receptionService: ReceptionService) {}
  router = inject(Router);

  ngOnInit(): void {
    this.getAllReceptionByPage(this.pageNumber, this.sizeNumber);
  }

  getAllReceptionByPage(page: number, size: number) {
    this.receptionService.getAllReceptionByPage(page, size).subscribe({
      next: (response) => {
        console.log('PAGES RECEPTIONS :: ', response);
        this.receptionList = response.content;
        this.totalElements = response.totalElements;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des réceptions : ', err);
      }
    });
  }

  onCreateReception() {
    this.router.navigate(['/admin/dashboard/reception-add']);
    console.log('Créer une nouvelle réception');
  }

  onDetail(reception: ReceptionResponseDto) {
    this.router.navigate(['/admin/dashboard/reception-detail', reception.id]);
    console.log('Afficher les détails de :', reception);
  }

  onEdit(reception: ReceptionResponseDto) {
    this.router.navigate(['/admin/dashboard/reception-edit', reception.id]);
    console.log('Modifier :', reception);
  }

  onDelete(reception: ReceptionResponseDto) {
    if (confirm(`Voulez-vous vraiment supprimer la réception avec l'ID ${reception.id} ?`)) {
      this.receptionService.deleteReception(reception.id!).subscribe({
        next: () => {
          console.log(`Réception avec ID ${reception.id} supprimée`);
          this.getAllReceptionByPage(this.pageNumber, this.sizeNumber);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression :', err);
        }
      });
    } else {
      console.log('Suppression annulée');
    }
  }

  navigateToPage(event: number) {
    console.log('TO PAGE :: ', event);
    this.getAllReceptionByPage(event - 1, this.sizeNumber);
  }
}
