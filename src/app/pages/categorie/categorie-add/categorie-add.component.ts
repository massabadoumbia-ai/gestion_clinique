import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategorieDto } from '../../dto/categorie.models.dto';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { CategorieService } from '../../../services/categorie/categorie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-categorie-add',
  standalone: true,
  imports: [CommonModule, FormsModule, NzFormModule, NzInputModule, NzButtonModule],
  templateUrl: './categorie-add.component.html',
  styleUrl: './categorie-add.component.css'
})
export class CategorieAddComponent implements OnInit {
  
  categorie: CategorieDto = {
    id: 0,
    nom: ''
  };

  size: NzSelectSizeType = "default";
  loading = false;
  errorMessages: string[] = [];

  constructor(private categorieService: CategorieService, private router: Router) {}

  ngOnInit(): void {
   
  }

  onSubmit() {
    this.errorMessages = [];
    this.loading = true;

    if (!this.categorie.nom || this.categorie.nom.trim().length < 2) {
      this.errorMessages.push("Le nom de la categorie doit contenir au moins 2 caractères.");
    }

    if (this.errorMessages.length > 0) {
      this.loading = false;
      return;
    }  

    this.categorieService.createCategorie(this.categorie).subscribe({
      next: () => {
        this.loading = false;
        alert('Categorie ajoutée avec succès');
        this.router.navigate(['/admin/dashboard/categorie-list']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Erreur lors de la création :', err);
        this.errorMessages = err.error?.messages || ['Erreur lors de la création de la categorie'];
      }
    });
  }

  onCancel() {
    this.router.navigate(['/admin/dashboard/categorie-list']);
  }
}

