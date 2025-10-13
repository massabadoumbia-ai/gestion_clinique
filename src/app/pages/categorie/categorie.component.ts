import { Component, inject } from '@angular/core';
import { NzPaginationComponent } from "ng-zorro-antd/pagination";
import { CategorieDto, CategorieResponseDto } from '../dto/categorie.models.dto';
import { Router } from '@angular/router';
import { CategorieService } from '../../services/categorie/categorie.service';
import { HasPermissionDirective } from '../../services/directives/has-permissions';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-categorie',
  standalone: true,
  imports: [NzPaginationComponent,HasPermissionDirective,FormsModule,
              NzFormModule,
              NzInputModule,
              NzButtonModule,],
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css'] 
})
export class CategorieComponent {

  constructor(private categorieService: CategorieService) {}

  router = inject(Router);

  categorieList: CategorieResponseDto[] = [];
  filteredCategorie: CategorieResponseDto[] = [];
  
    filters = {
      nom: '',
    }
  sizeNumber: number = 10;
  pageNumber: number = 1;
  totalElements: number = 0;

  ngOnInit(): void {
    this.getAllCategorieByPage(this.pageNumber - 1, this.sizeNumber);
  }

  applyFilters(): void {
  const { nom } = this.filters;

  this.filteredCategorie = this.categorieList.filter(categorie =>
    !nom || categorie.nom?.toLowerCase().includes(nom.toLowerCase())
  );
}

  getAllCategorieByPage(page: number, size: number) {
    this.categorieService.getAllCategorieByPage(page, size).subscribe({
      next: (response) => {
        console.log("PAGES ELEMENTS :: ", response);
        this.categorieList = response.content;
         this.filteredCategorie = response.content; 
        this.totalElements = response.totalElements;
        console.log("TOTAL ELEMENTS :: ", this.totalElements);
      },
      error: (err) => {
        console.error("Erreur lors du chargement des catégories :: ", err);
      }
    });
  }

  onCreateCategorie() {
    this.router.navigate(['/admin/dashboard/categorie-add']);
    console.log('Créer une nouvelle catégorie');
  }

  onEdit(categorie: CategorieResponseDto) {
    this.router.navigate(['/admin/dashboard/categorie-edit/', categorie.id]);
    console.log('Modifier :', categorie);
  }

  onDelete(categorie: CategorieResponseDto) {
    if (confirm(`Voulez-vous vraiment supprimer la catégorie avec l'ID ${categorie.id} ?`)) {
      this.categorieService.deleteCategorie(categorie.id!).subscribe({
        next: () => {
          console.log(`Catégorie avec ID ${categorie.id} supprimée`);
          this.getAllCategorieByPage(this.pageNumber - 1, this.sizeNumber);
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
    this.getAllCategorieByPage(event - 1, this.sizeNumber);
  }
}
