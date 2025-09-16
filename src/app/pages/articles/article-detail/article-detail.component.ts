import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../../../services/article/articles.service';
import { ArticlesDto, ArticlesResponseDto } from '../../dto/articles.models.dto';

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
    marqueId: 0,
    categorieId: 0
  };

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
  }

  onSubmit(): void {
    if (this.article.id) {
      this.articlesService.updateArticles(this.article.id, this.article).subscribe({
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
