import { Component, inject, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzPaginationComponent } from "ng-zorro-antd/pagination";
import { ReceptionResponseDto } from '../dto/reception.models.dto';
import { ReceptionService } from '../../services/reception/reception.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reception',
  standalone: true,
  imports: [NzPaginationComponent, CommonModule,],
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.css']
})
export class ReceptionComponent implements OnInit {

  receptionList: ReceptionResponseDto[] = [];
  size: NzButtonSize = 'small';
  totalElements: number = 0;
  pageNumber: number = 0;
  sizeNumber: number = 10;

  private receptionService = inject(ReceptionService);
  private router = inject(Router);

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
        next: () => {
          console.log(`Réception avec ID ${reception.id} supprimée`);
          this.getAllReceptionByPage(this.pageNumber, this.sizeNumber);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression :', err);
        }
      });
    }
  }

  navigateToPage(event: number) {
    this.pageNumber = event - 1;
    this.getAllReceptionByPage(this.pageNumber, this.sizeNumber);
  }
}
