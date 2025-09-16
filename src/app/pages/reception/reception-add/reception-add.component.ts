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

import { ReceptionService } from '../../../services/reception/reception.service';
import { FournisseurService } from '../../../services/fournisseur/fournisseur.service';
import { EmployeService } from '../../../services/employe/employe.service';
import { ReceptionResponseDto } from '../../dto/reception.models.dto';
import { FournisseurResponseDto } from '../../dto/fournisseur.models.dto';
import { EmployeResponseDto } from '../../dto/employe.models.dto';

@Component({
  selector: 'app-reception-add',
  standalone: true,
  imports: [CommonModule, FormsModule, NzFormModule, NzInputModule, NzButtonModule, NzSelectModule],
  templateUrl: './reception-add.component.html',
  styleUrls: ['./reception-add.component.css']
})
export class ReceptionAddComponent implements OnInit {

  reception: ReceptionResponseDto = {
    id: 0,
    numReception: '',
    dateContrat: '',
    dateReception: '',
    nbrArticle: 0,
    employeId: '',
    fournisseurId: ''
  };

  size: NzSelectSizeType = 'large';
  errorMessages: string[] = [];
  loading = false;

  employeOptionList: EmployeResponseDto[] = [];
  fournisseurOptionList: FournisseurResponseDto[] = [];
  loadingEmploye = false;
  loadingFournisseur = false;

  private employeSearch$ = new BehaviorSubject<string>('');
  private fournisseurSearch$ = new BehaviorSubject<string>('');

  constructor(
    private receptionService: ReceptionService,
    private employeService: EmployeService,
    private fournisseurService: FournisseurService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeSearch$
      .pipe(
        debounceTime(300),
        switchMap(term => this.searchEmployes(term))
      )
      .subscribe(list => {
        this.employeOptionList = list;
        this.loadingEmploye = false;
      });

    this.fournisseurSearch$
      .pipe(
        debounceTime(300),
        switchMap(term => this.searchFournisseurs(term))
      )
      .subscribe(list => {
        this.fournisseurOptionList = list;
        this.loadingFournisseur = false;
      });

    this.onSearchEmploye('');
    this.onSearchFournisseur('');
  }

  onSearchEmploye(term: string) {
    this.loadingEmploye = true;
    this.employeSearch$.next(term);
  }

  onSearchFournisseur(term: string) {
    this.loadingFournisseur = true;
    this.fournisseurSearch$.next(term);
  }

  private searchEmployes(term: string) {
    return this.employeService.getAllEmployeByPage().pipe(
      map(resp => resp.content || resp), 
      map(list => list.filter(e => e.nom.toLowerCase().includes(term.toLowerCase()))),
      catchError(() => of([]))
    );
  }

  private searchFournisseurs(term: string) {
    return this.fournisseurService.getAllFournisseur().pipe(
      map(list => list.filter(f => f.nom.toLowerCase().includes(term.toLowerCase()))),
      catchError(() => of([]))
    );
  }

  onSubmit() {
    this.errorMessages = [];
    this.loading = true;

    if (!this.reception.numReception) this.errorMessages.push('Le numéro de réception est obligatoire.');
    if (!this.reception.dateContrat) this.errorMessages.push('La date du contrat est obligatoire.');
    if (!this.reception.dateReception) this.errorMessages.push('La date de réception est obligatoire.');
    if (!this.reception.employeId) this.errorMessages.push('L’employé est obligatoire.');
    if (!this.reception.fournisseurId) this.errorMessages.push('Le fournisseur est obligatoire.');

    if (this.errorMessages.length > 0) {
      this.loading = false;
      return;
    }

    this.receptionService.createReception(this.reception).subscribe({
      next: () => {
        this.loading = false;
        alert('Réception ajoutée avec succès');
        this.router.navigate(['/admin/dashboard/receptions-list']);
      },
      error: err => {
        this.loading = false;
        console.error("Erreur lors de l'ajout :", err);
        this.errorMessages.push("Erreur : " + (err.error?.message || "Impossible d'ajouter la réception."));
      }
    });
  }

  onCancel() {
    window.history.back();
  }
}
