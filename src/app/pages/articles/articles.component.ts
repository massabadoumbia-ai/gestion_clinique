import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { Router } from '@angular/router';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { HasPermissionDirective } from '../../services/directives/has-permissions';
import { ArticlesResponseDto, ArticlesSearchRequestDto } from '../dto/articles.models.dto';
import { ArticlesService } from '../../services/article/articles.service';
import { CommonModule } from '@angular/common';
import { MarqueResponseDto } from '../dto/marque.models.dto';
import { CategorieResponseDto } from '../dto/categorie.models.dto';
import { MarqueService } from '../../services/marque/marque.service';
import { CategorieService } from '../../services/categorie/categorie.service';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';


@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzIconModule,
    NzButtonModule,
    NzFlexModule,
    NzPaginationModule,
    HasPermissionDirective,
    FormsModule,
    NzSelectModule,
    NzFormModule,
    NzInputModule,
  ],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ArticlesComponent implements OnInit {

  articleList: ArticlesResponseDto[] = [];
  filteredArticles: ArticlesResponseDto[] = [];

  filters = {
    libArt: '',
    type: '',
    etat: '',
    marqueId: null as number | null,
    categorieId: null as number | null
  };

  marques: MarqueResponseDto[] = [];
  categories: CategorieResponseDto[] = [];
  size: NzButtonSize = 'small';
  totalElements: number = 0;
  pageNumber: number = 0;
  sizeNumber: number = 10;

  constructor(
    private articlesService: ArticlesService,
    private marqueService: MarqueService,
    private categorieService: CategorieService
  ) {}

  router = inject(Router);

  ngOnInit(): void {
    this.getAllArticlesByPage(this.pageNumber, this.sizeNumber);
    this.loadMarquesEtCategories();
  }

  loadMarquesEtCategories(): void {
    this.marqueService.getAllMarques().subscribe({
      next: (marques) => {
        this.marques = marques;
      },
      error: (err) => console.error('Erreur chargement marques :', err)
    });

    this.categorieService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => console.error('Erreur chargement catégories :', err)
    });
  }

  applyFilters(): void {
    const filtersToSend: ArticlesSearchRequestDto = {
    libArt: this.filters.libArt || '',
    type: this.filters.type || '',
    etat: this.filters.etat ||'' ,
    marqueId: this.filters.marqueId || 0,
    categorieId: this.filters.categorieId || 0
  };


    this.articlesService.searchArticles(filtersToSend, this.pageNumber, this.sizeNumber)
      .subscribe({
        next: (response) => {
          this.filteredArticles = response.content;
          this.totalElements = response.totalElements;
        },
        error: (err) => console.error('Erreur lors de la recherche :', err)
      });
  }

  getAllArticlesByPage(page: number, size: number): void {
    this.articlesService.getAllArticlesByPage(page, size).subscribe({
      next: (response: { content: ArticlesResponseDto[], totalElements: number }) => {
        this.articleList = response.content;
        this.filteredArticles = response.content;
        this.totalElements = response.totalElements;
      },
      error: (err) => console.error('Erreur lors de la récupération des articles :', err)
    });
  }

  onCreateArticle(): void {
    this.router.navigate(['/admin/dashboard/article-add']);
  }

  onDetail(article: ArticlesResponseDto): void {
    this.router.navigate(['/admin/dashboard/article-detail', article.id]);
  }

  onEdit(article: ArticlesResponseDto): void {
    this.router.navigate(['/admin/dashboard/article-edit', article.id]);
  }

  onDelete(article: ArticlesResponseDto): void {
    if (confirm(`Voulez-vous vraiment supprimer l'article "${article.libArt}" ?`)) {
      this.articlesService.deleteArticle(article.id!).subscribe({
        next: () => this.getAllArticlesByPage(this.pageNumber, this.sizeNumber),
        error: (err) => console.error('Erreur suppression article :', err)
      });
    }
  }

  navigateToPage(event: number): void {
    this.getAllArticlesByPage(event - 1, this.sizeNumber);
  }
}
