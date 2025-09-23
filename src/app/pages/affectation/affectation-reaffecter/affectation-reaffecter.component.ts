import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule, NzSelectSizeType } from 'ng-zorro-antd/select';
import { AffectationArticlesResponseDto } from '../../dto/affectation.models.dto';
import { ArticlesResponseDto } from '../../dto/articles.models.dto';
import { EmployeResponseDto } from '../../dto/employe.models.dto';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AffectationService } from '../../../services/affectation/affectation.service';
import { ArticlesService } from '../../../services/article/articles.service';
import { EmployeService } from '../../../services/employe/employe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';
import  dayjs from 'dayjs';

@Component({
  selector: 'app-affectation-reaffecter',
  standalone: true,
  imports: [CommonModule, FormsModule, NzFormModule, NzInputModule, NzButtonModule, NzSelectModule],
  templateUrl: './affectation-reaffecter.component.html',
  styleUrl: './affectation-reaffecter.component.css'
})
export class AffectationReaffecterComponent implements OnInit {

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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.affectationService.getAffectationById(id).subscribe({
        next: (data) => {
          this.affectation = {
          ...data,
          dateDebut: data.dateDebut ? dayjs(data.dateDebut).format('YYYY-MM-DD') : '',
          dateFin: data.dateFin ? dayjs(data.dateFin).format('YYYY-MM-DD') : ''
    };
          console.log('affectation ===>', this.affectation) 
        },
        error: (err) => console.error('Erreur récupération affectation :', err)
      });
    }

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
    const debut = dayjs(this.affectation.dateDebut);
  const fin = dayjs(this.affectation.dateFin);

    if (!debut.isValid()) this.errorMessages.push('La date de début est invalide.');
    if (!fin.isValid()) this.errorMessages.push('La date de fin est invalide.');
    if (fin.isBefore(debut)) this.errorMessages.push('La date de fin doit être après la date de début.');

    if (this.affectation.nbrArticle <= 0) this.errorMessages.push('Le nombre d’articles doit être supérieur à 0.');
    if (!this.affectation.articleId) this.errorMessages.push('Veuillez sélectionner un article.');
    if (!this.affectation.employeId) this.errorMessages.push('Veuillez sélectionner un employé.');
    if (!this.affectation.etat) this.errorMessages.push('Veuillez renseigner l’état.');

    if (this.errorMessages.length > 0) {
      this.loading = false;
      return;
    }

     const affectationPayload = {
    ...this.affectation,
    dateDebut: debut.toISOString(),
    dateFin: fin.toISOString()
  };

    this.affectationService.reaffecter(this.affectation.id!, affectationPayload).subscribe({
      next: () => {
        this.loading = false;
        alert('Affectation réaffectée avec succès');
        this.router.navigate(['/admin/dashboard/affectation-list']);
      },
      error: (err) => {
        this.loading = false;
        console.error("Erreur lors de la réaffectation :", err);
        this.errorMessages.push("Erreur : " + (err.error?.message || "Impossible de réaffecter l'affectation."));
      }
    });
  }

  onCancel() {
    window.history.back();
  }
}