import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule, NzSelectSizeType } from 'ng-zorro-antd/select';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { debounceTime, switchMap, map, catchError } from 'rxjs/operators';

import { ArticlesService } from '../../../services/article/articles.service';
import { MarqueService } from '../../../services/marque/marque.service';
import { CategorieService } from '../../../services/categorie/categorie.service';
import { ArticlesDto, ArticlesResponseDto } from '../../dto/articles.models.dto';
import { MarqueResponseDto } from '../../dto/marque.models.dto';
import { CategorieResponseDto } from '../../dto/categorie.models.dto';

@Component({
  selector: 'app-article-add',
  standalone: true,
  imports: [CommonModule, FormsModule, NzFormModule, NzInputModule, NzButtonModule, NzSelectModule],
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.css']
})
export class ArticleAddComponent implements OnInit {

  article: ArticlesResponseDto = {
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
     marqueNom: '',
    categorieNom: '',
    imageUrl: ''
  };

  size: NzSelectSizeType = 'large';
  errorMessages: string[] = [];
  loading = false;

  marqueOptionList: MarqueResponseDto[] = [];
  categorieOptionList: CategorieResponseDto[] = [];
  loadingMarque = false;
  loadingCategorie = false;

  private marqueSearch$ = new BehaviorSubject<string>('');
  private categorieSearch$ = new BehaviorSubject<string>('');

  selectedImageFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private articlesService: ArticlesService,
    private marqueService: MarqueService,
    private categorieService: CategorieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.marqueSearch$.pipe(
      debounceTime(300),
      switchMap(term => this.searchMarques(term))
    ).subscribe(list => { this.marqueOptionList = list; this.loadingMarque = false; });

    this.categorieSearch$.pipe(
      debounceTime(300),
      switchMap(term => this.searchCategories(term))
    ).subscribe(list => { this.categorieOptionList = list; this.loadingCategorie = false; });

    this.onSearchMarque('');
    this.onSearchCategorie('');
  }

  onSearchMarque(term: string) { this.loadingMarque = true; this.marqueSearch$.next(term); }
  onSearchCategorie(term: string) { this.loadingCategorie = true; this.categorieSearch$.next(term); }

  private searchMarques(term: string) {
    return this.marqueService.getAllMarques().pipe(
      map(list => list.filter(m => m.nom.toLowerCase().includes(term.toLowerCase()))),
      catchError(() => of([]))
    );
  }

  private searchCategories(term: string) {
    return this.categorieService.getAllCategories().pipe(
      map(list => list.filter(c => c.nom.toLowerCase().includes(term.toLowerCase()))),
      catchError(() => of([]))
    );
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;
      const reader = new FileReader();
      reader.onload = () => {
      this.imagePreview = reader.result; 
    };
    reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.errorMessages = [];
    this.loading = true;

    if (!this.article.libArt) this.errorMessages.push('Le libellé est obligatoire.');
    if (this.article.stock < 0) this.errorMessages.push('Le stock doit être ≥ 0.');
    if (!this.article.type) this.errorMessages.push('Le type est obligatoire.');
    if (!this.article.etat) this.errorMessages.push("L'état est obligatoire.");

    if (this.errorMessages.length > 0) { this.loading = false; return; }

     const formData = new FormData();
    formData.append("article", new Blob([JSON.stringify(this.article)], { type: "application/json" }));
    if (this.selectedImageFile) {
      formData.append("image", this.selectedImageFile);
    }


    this.articlesService.createArticle(formData).subscribe({
      next: () => {
        this.loading = false;
        alert('Article ajouté avec succès');
        this.router.navigate(['/admin/dashboard/article-list']);
      },
      error: err => {
        this.loading = false;
        console.error("Erreur lors de l'ajout :", err);
        this.errorMessages.push("Erreur : " + (err.error?.message || "Impossible d'ajouter l'article."));
      }
    });
  }

  onCancel() { window.history.back(); }
}
