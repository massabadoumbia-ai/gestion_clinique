import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MarqueService } from '../../services/marque/marque.service';
import { MarqueDto, MarqueResponseDto } from '../dto/marque.models.dto';
import { NzPaginationComponent } from "ng-zorro-antd/pagination";


@Component({
  selector: 'app-marque',
  standalone: true,
  imports: [NzPaginationComponent],
  templateUrl: './marque.component.html',
  styleUrl: './marque.component.css'
})
export class MarqueComponent {
   constructor(private marqueService: MarqueService) {}
  router = inject(Router);

  marqueList: MarqueResponseDto[] = [];
  sizeNumber: number = 10;
  pageNumber: number = 1;
  totalElements: number = 0;

  ngOnInit(): void {
    this.getAllMarqueByPage(this.pageNumber - 1, this.sizeNumber);
  }

  getAllMarqueByPage(page: number, size: number){
    this.marqueService.getAllMarqueByPage(page, size).subscribe({
        next: (response)=>{
          console.log("PAGES ELEMENTS :: ", response)
         this.marqueList=response.content;
         this.totalElements = response.totalElements;
         //this.pageNumber = page + 1;
         console.log("TOTAL ELEMENTS :: ", this.totalElements)
        }
      })
  }

  onCreateMarque() {
    this.router.navigate(['/admin/dashboard/marque-add'])
    console.log('Créer une nouvelle marque');
  }

  onEdit(marque: MarqueResponseDto) {
    this.router.navigate(['/admin/dashboard/marque-edit/', marque.id]);
    console.log('Modifier :', marque);
  }

  onDelete(marque: MarqueResponseDto) {
    if (confirm(`Voulez-vous vraiment supprimer la marque avec l'ID ${marque.id} ?`)) {
      this.marqueService.deleteMarque(marque.id!).subscribe({
        next: () => {
          console.log(`Marque avec ID ${marque.id} supprimée`);
          this.getAllMarqueByPage(this.pageNumber - 1, this.sizeNumber);
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

    this.getAllMarqueByPage(event - 1, this.sizeNumber);
  }

}