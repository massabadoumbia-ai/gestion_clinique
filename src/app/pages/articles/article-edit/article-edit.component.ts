import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule, NzSelectSizeType } from 'ng-zorro-antd/select';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { debounceTime, switchMap, map, catchError } from 'rxjs/operators';

import { ArticlesService } from '../../../services/article/articles.service';
import { ArticlesDto } from '../../dto/articles.models.dto';
import { MarqueResponseDto } from '../../dto/marque.models.dto';
import { CategorieResponseDto } from '../../dto/categorie.models.dto';

@Component({
  selector: 'app-article-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, NzFormModule, NzInputModule, NzButtonModule, NzSelectModule],
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {

  article: ArticlesDto = {
    id: 0,
    libArt: '',
    niveauAlert: 0,
    caracteristique: '',
    stock: 0,
    type: '',
    etat: '',
    commentaire: '',
    marqueId: 0,
    categorieId: 0,
    image: '',
     marqueNom: '',
    categorieNom: '',
  };

  size: NzSelectSizeType = 'large';
  loading = false;
  selectedImageFile?: File;
  imagePreview: string | ArrayBuffer | null = null;

  marqueOptionList: MarqueResponseDto[] = [];
  categorieOptionList: CategorieResponseDto[] = [];
  loadingMarque = false;
  loadingCategorie = false;

  private marqueSearch$ = new BehaviorSubject<string>('');
  private categorieSearch$ = new BehaviorSubject<string>('');

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private articlesService = inject(ArticlesService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.articlesService.getArticlesById(+id).subscribe({
        next: data => {
          this.article = data;
          if (data.image) {
            this.imagePreview = `data:image/*;base64,${data.image}`;
          }
        },
        error: () => alert('Erreur lors du chargement de l’article')
      });
    }
    this.marqueSearch$.pipe(
      debounceTime(300),
      switchMap(term => this.loadMarques(term))
    ).subscribe(list => { this.marqueOptionList = list; this.loadingMarque = false; });

    this.categorieSearch$.pipe(
      debounceTime(300),
      switchMap(term => this.loadCategories(term))
    ).subscribe(list => { this.categorieOptionList = list; this.loadingCategorie = false; });

    this.onSearchMarque('');
    this.onSearchCategorie('');
  }

  private loadMarques(term: string) {
    this.loadingMarque = true;
    return this.articlesService.getMarques().pipe(
      map(list => list.filter(m => m.nom.toLowerCase().includes(term.toLowerCase()))),
      catchError(() => of([]))
    );
  }

  private loadCategories(term: string) {
    this.loadingCategorie = true;
    return this.articlesService.getCategories().pipe(
      map(list => list.filter(c => c.nom.toLowerCase().includes(term.toLowerCase()))),
      catchError(() => of([]))
    );
  }

  onSearchMarque(term: string) { this.marqueSearch$.next(term); }
  onSearchCategorie(term: string) { this.categorieSearch$.next(term); }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;
      const reader = new FileReader();
      reader.onload = () => this.imagePreview = reader.result;
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (!this.article.libArt || !this.article.marqueId || !this.article.categorieId) {
      alert('Libellé, marque et catégorie sont obligatoires');
      return;
    }

    this.loading = true;

    const formData = new FormData();
    formData.append('article', new Blob([JSON.stringify(this.article)], { type: 'application/json' }));

    if (this.selectedImageFile) {
      formData.append('image', this.selectedImageFile);
    }

    if (this.article.id) {
      this.articlesService.updateArticles(this.article.id, formData).subscribe({
        next: () => {
          this.loading = false;
          alert('Article mis à jour avec succès');
          this.router.navigate(['/admin/dashboard/article-list']);
        },
        error: err => {
          this.loading = false;
          console.error(err);
          alert('Erreur lors de la mise à jour de l\'article');
        }
      });
    }
  }

    onCancel() { window.history.back(); }
}
