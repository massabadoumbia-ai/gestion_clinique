import { Component, inject, OnInit } from '@angular/core';
import { ArticlesDto } from '../../dto/articles.models.dto';
import { ArticlesService } from '../../../services/article/articles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, NzFormModule, NzInputModule, NzButtonModule],
  templateUrl: './article-edit.component.html',
  styleUrl: './article-edit.component.css'
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
    image: ''
  };

  selectedImageFile?: File; 
  loading = false;
  marqueList: any[] = [];
  categorieList: any[] = [];

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private articlesService = inject(ArticlesService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.articlesService.getArticlesById(+id).subscribe({
        next: (data: ArticlesDto) => this.article = data,
        error: () => alert('Erreur lors du chargement de l’article')
      });
    }

    this.getMarques();
    this.getCategories();
  }

  getMarques() {
    this.articlesService.getMarques().subscribe({ next: res => this.marqueList = res });
  }

  getCategories() {
    this.articlesService.getCategories().subscribe({ next: res => this.categorieList = res });
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedImageFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    this.loading = true;

    const formData = new FormData();
    formData.append('libArt', this.article.libArt);
    formData.append('stock', this.article.stock.toString());
    formData.append('niveauAlert', this.article.niveauAlert.toString());
    formData.append('type', this.article.type);
    formData.append('etat', this.article.etat);
    formData.append('caracteristique', this.article.caracteristique || '');
    formData.append('commentaire', this.article.commentaire || '');
    formData.append('marqueId', this.article.marqueId.toString());
    formData.append('categorieId', this.article.categorieId.toString());

    if (this.selectedImageFile) {
      formData.append('image', this.selectedImageFile);
    }

    if (this.article.id) {
      this.articlesService.updateArticles(this.article.id, formData).subscribe({
        next: () => {
          this.loading = false;
          alert('Article mis à jour avec succès');
          this.router.navigate(['/admin/dashboard/articles-list']);
        },
        error: () => {
          this.loading = false;
          alert("Erreur lors de la mise à jour de l'article");
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin/dashboard/articles-list']);
  }
}
