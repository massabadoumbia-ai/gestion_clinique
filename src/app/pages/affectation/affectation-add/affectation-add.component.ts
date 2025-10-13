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

import { AffectationService } from '../../../services/affectation/affectation.service';
import { ArticlesService } from '../../../services/article/articles.service';
import { EmployeService } from '../../../services/employe/employe.service';
import { AffectationArticlesResponseDto } from '../../dto/affectation.models.dto';
import { ArticlesResponseDto } from '../../dto/articles.models.dto';
import { EmployeResponseDto } from '../../dto/employe.models.dto';

@Component({
  selector: 'app-affectation-add',
  standalone: true,
  imports: [CommonModule, FormsModule, NzFormModule, NzInputModule, NzButtonModule, NzSelectModule],
  templateUrl: './affectation-add.component.html',
  styleUrl: './affectation-add.component.css'
})
export class AffectationAddComponent implements OnInit {

  affectation: AffectationArticlesResponseDto = {
    dateDebut: '',
    dateFin: '',
    nbrArticle: 0,
   libArt: '',
    employeNom:'' , 
    employePrenom: '', 
    articleId:0,
    employeId: 0,
    employeEmail: '',   
	 employePoste: '',      
	 employeDivision: '',
   etat:'',

  };

  size: NzSelectSizeType = 'large';
  errorMessages: string[] = [];
  loading = false;

  articleOptionList: ArticlesResponseDto[] = [];
  employeOptionList: EmployeResponseDto[] = [];

  loadingArticles = false;
  loadingEmploye = false;

  private articleSearch$ = new BehaviorSubject<string>('');
  private employeSearch$ = new BehaviorSubject<string>('');

  constructor(
    private affectationService: AffectationService,
    private articlesService: ArticlesService,
    private employeService: EmployeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.articleSearch$
      .pipe(
        debounceTime(300),
        switchMap(term => this.searchArticles(term))
      )
      .subscribe(data => {
        this.articleOptionList = data;
        this.loadingArticles = false;
      });

    this.employeSearch$
      .pipe(
        debounceTime(300),
        switchMap(term => this.searchEmployes(term))
      )
      .subscribe(data => {
        this.employeOptionList = data;
        this.loadingEmploye = false;
      });

    this.onSearchArticle('');
    this.onSearchEmploye('');
  }

  onSearchArticle(value: string) {
    this.loadingArticles = true;
    this.articleSearch$.next(value);
  }

  onSearchEmploye(value: string) {
    this.loadingEmploye = true;
    this.employeSearch$.next(value);
  }

  searchArticles(term: string) {
    if (!term) term = '';
    return this.articlesService.getAllArticles().pipe(
      map(list => list.filter(a => a.libArt.toLowerCase().includes(term.toLowerCase()))),
      catchError(() => of([]))
    );
  }

  searchEmployes(term: string) {
    if (!term) term = '';
    return this.employeService.getAllEmployeByPage().pipe(
      map(resp => resp.content.filter(e => e.nom.toLowerCase().includes(term.toLowerCase()))),
      catchError(() => of([]))
    );
  }

  onSubmit() {
    this.errorMessages = [];
    this.loading = true;

console.log("AFFECTATION :: ", this.affectation)
    if (!this.affectation.dateDebut) this.errorMessages.push('La date de début est obligatoire.');
    if (!this.affectation.dateFin) this.errorMessages.push('La date de fin est obligatoire.');
    if (this.affectation.nbrArticle <= 0) this.errorMessages.push('Le nombre d’articles doit être supérieur à 0.');
    if (!this.affectation.articleId) this.errorMessages.push('Veuillez sélectionner un article.');
    if (!this.affectation.employeId) this.errorMessages.push('Veuillez sélectionner un employé.');

    if (this.errorMessages.length > 0) {
      this.loading = false;
      return;
    }

    this.affectationService.createAffectation(this.affectation).subscribe({
      next: () => {
        this.loading = false;
        alert('Affectation ajoutée avec succès');
        this.router.navigate(['/admin/dashboard/affectation-list']);
      },
      error: (err) => {
        this.loading = false;
        console.error("Erreur lors de l'ajout :", err);
        this.errorMessages.push("Erreur : " + (err.error?.message || "Impossible d'ajouter l'affectation."));
      }
    });
  }

  onCancel() {
    window.history.back();
  }
}
