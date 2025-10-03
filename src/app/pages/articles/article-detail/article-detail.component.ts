import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../../../services/article/articles.service';
import { ArticlesResponseDto } from '../../dto/articles.models.dto';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.css'
})
export class ArticleDetailComponent implements OnInit {

  article: ArticlesResponseDto = {
  id: 0,
  libArt: '',
  niveauAlert: 0,
  caracteristique: '',
  stock: 0,
  type: '',
  etat: '',
  commentaire: '',
  image: '',
  marqueId: 0,
  marqueNom: '',       
  categorieId: 0,
  categorieNom: ''
  };

  selectedImageFile?: File; 

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private articlesService = inject(ArticlesService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.articlesService.getArticlesById(+id).subscribe({
        next: (data: ArticlesResponseDto) => this.article = data,
        error: () => alert('Erreur lors du chargement de l’article')
      });
    }
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedImageFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    if (this.article.id) {
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

      this.articlesService.updateArticles(this.article.id, formData).subscribe({
        next: () => {
          alert('Article mis à jour avec succès');
          this.router.navigate(['/admin/dashboard/articles-list']);
        },
        error: () => alert("Erreur lors de la mise à jour de l’article")
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin/dashboard/articles-list']);
  }
}
