import { Component, inject, OnInit } from '@angular/core';
import { CategorieDto, CategorieResponseDto } from '../../dto/categorie.models.dto';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CategorieService } from '../../../services/categorie/categorie.service';

@Component({
  selector: 'app-categorie-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, NzFormModule, NzInputModule, NzButtonModule],
  templateUrl: './categorie-edit.component.html',
  styleUrl: './categorie-edit.component.css'
})
export class CategorieEditComponent implements OnInit {
   categorie: CategorieResponseDto = {
     id: 0,
     nom: '',
     articlesId: 0
   };
  
    size: NzSelectSizeType = "default";
    loading = false;
    errorMessages: string[] = [];
  
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private categorieService = inject(CategorieService);
  
    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.categorieService.getCategorieById(+id).subscribe({
          next: (data: CategorieResponseDto) => this.categorie = data,
          error: () => alert('Erreur lors du chargement de la categorie')
        });
      }
    }
  
    onSubmit(): void {
      this.errorMessages = [];
      this.loading = true;
  
      if (!this.categorie.nom || this.categorie.nom.trim().length < 2) {
        this.errorMessages.push("Le nom de la categirier doit contenir au moins 2 caractères.");
      }
  
      if (this.errorMessages.length > 0) {
        this.loading = false;
        return;
      }
  
      if (this.categorie.id) {
        this.categorieService.updateCategorie(this.categorie.id, this.categorie).subscribe({
          next: () => {
            this.loading = false;
            alert('Categorie mise à jour avec succès');
            this.router.navigate(['/admin/dashboard/categorie-list']);
          },
          error: (err) => {
            this.loading = false;
            console.error('Erreur lors de la mise à jour :', err);
            this.errorMessages = err.error?.messages || ['Erreur lors de la mise à jour de la categorie'];
          }
        });
      }
    }
  
    onCancel(): void {
      this.router.navigate(['/admin/dashboard/categorie-list']);
    }
  }


