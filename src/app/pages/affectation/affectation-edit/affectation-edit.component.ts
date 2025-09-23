import { Component, inject, OnInit } from '@angular/core';
import { AffectationArticlesResponseDto } from '../../dto/affectation.models.dto';
import { ArticlesResponseDto } from '../../dto/articles.models.dto';
import { EmployeResponseDto } from '../../dto/employe.models.dto';
import { NzSelectModule, NzSelectSizeType } from 'ng-zorro-antd/select';
import { ActivatedRoute, Router } from '@angular/router';
import { AffectationService } from '../../../services/affectation/affectation.service';
import { EmployeService } from '../../../services/employe/employe.service';
import { ArticlesService } from '../../../services/article/articles.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';


@Component({
  selector: 'app-affectation-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, NzFormModule, NzInputModule, NzButtonModule, NzSelectModule],
  templateUrl: './affectation-edit.component.html',
  styleUrl: './affectation-edit.component.css'
})
export class AffectationEditComponent implements OnInit {
  affectation: AffectationArticlesResponseDto = {
     id: 0,
    articleId: 0,
    employeId: 0,
    libArt: '',
    employeNom: '',
    employePrenom: '',
    employeEmail: '',
    employePoste: '',
    employeDivision: '',
    etat: '',
    dateDebut: '',
    dateFin: '',
    nbrArticle: 0
   
  };

  articleList: ArticlesResponseDto[] = [];
  employeList: EmployeResponseDto[] = [];
  size: NzSelectSizeType = 'large';
  loading = false;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private affectationService = inject(AffectationService);
  private employeService = inject(EmployeService);
  private articleService = inject(ArticlesService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.affectationService.getAffectationById(+id).subscribe({
        next: (data: AffectationArticlesResponseDto) => {
              this.affectation = {
        id: data.id,
        articleId: data.articleId,
        libArt: data.libArt,
        etat: data.etat,
        employeId: data.employeId,
        employeNom: data.employeNom,
        employePrenom: data.employePrenom,
        employeEmail: data.employeEmail,
        employePoste: data.employePoste,
        employeDivision: data.employeDivision,
        dateDebut: data.dateDebut,
        dateFin: data.dateFin,
        nbrArticle: data.nbrArticle
                };
                
        },
        error: () => alert('Erreur lors du chargement de l’affectation')
      });
    }

    this.employeService.getAllEmployeByPage(0, 50).subscribe({
      next: (response) => this.employeList = response.content,
      error: () => alert('Erreur lors du chargement des employés')
    });

    this.articleService.getAllArticlesByPage(0, 50).subscribe({
      next: (response) => this.articleList = response.content,
      error: () => alert('Erreur lors du chargement des articles')
    });
  }

  onSubmit(): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.affectationService.updateAffectation(+id, this.affectation).subscribe({
        next: () => {
          this.loading = false;
          alert('Affectation mise à jour avec succès');
          this.router.navigate(['/admin/dashboard/affectation-list']);
        },
        error: () => {
          this.loading = false;
          alert("Erreur lors de la mise à jour de l’affectation");
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin/dashboard/affectation-list']);
  }
}