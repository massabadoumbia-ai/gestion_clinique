import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { Router } from '@angular/router';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { HasPermissionDirective } from '../../services/directives/has-permissions';
import { ArticlesResponseDto } from '../dto/articles.models.dto';
import { ArticlesService } from '../../services/article/articles.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [NzTableModule, NzIconModule, NzButtonModule, NzFlexModule, NzPaginationModule, CommonModule],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ArticlesComponent implements OnInit {

  articleList: ArticlesResponseDto[] = [];
  size: NzButtonSize = 'small';
  totalElements: number = 0;
  pageNumber: number = 0;
  sizeNumber: number = 10;

  constructor(private articlesService: ArticlesService) {}
  router = inject(Router);

  ngOnInit(): void {
    this.getAllArticlesByPage(this.pageNumber, this.sizeNumber);
  }

  getAllArticlesByPage(page: number, size: number) {
    this.articlesService.getAllArticlesByPage(page, size).subscribe({
      next: (response: { content: ArticlesResponseDto[], totalElements: number }) => {
        console.log("PAGES ARTICLES :: ", response);
        this.articleList = response.content;
        this.totalElements = response.totalElements;
        console.log("TOTAL ARTICLES :: ", this.totalElements);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des articles :', err);
      }
    });
  }

  onCreateArticle() {
    this.router.navigate(['/admin/dashboard/article-add']);
    console.log('Créer un nouvel article');
  }

  onDetail(article: ArticlesResponseDto) {
    this.router.navigate(['/admin/dashboard/article-detail', article.id]);
    console.log('Afficher les détails de :', article);
  }

  onEdit(article: ArticlesResponseDto) {
    this.router.navigate(['/admin/dashboard/article-edit/', article.id]);
    console.log('Modifier :', article);
  }

  onDelete(article: ArticlesResponseDto) {
    if (confirm(`Voulez-vous vraiment supprimer l'article avec l'ID ${article.id} ?`)) {
      this.articlesService.deleteArticle(article.id!).subscribe({
        next: () => {
          console.log(`Article avec ID ${article.id} supprimé`);
          this.getAllArticlesByPage(this.pageNumber, this.sizeNumber);
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
    this.getAllArticlesByPage(event - 1, this.sizeNumber);
  }
}
