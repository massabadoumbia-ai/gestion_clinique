import { Component, inject, OnInit } from '@angular/core';
import { EmployeResponseDto } from '../../dto/employe.models.dto';
import { DivisionResponseDto } from '../../dto/division.models.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeService } from '../../../services/employe/employe.service';
import { DivisionService } from '../../../services/division/division.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-employe-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, NzFormModule, NzInputModule, NzButtonModule, NzSelectModule],
  templateUrl: './employe-edit.component.html',
  styleUrls: ['./employe-edit.component.css']
})
export class EmployeEditComponent implements OnInit {

  employe: EmployeResponseDto = {
    id: 0,
    nom: '',
    prenom: '',
    poste: '',
    email: '',
    divisionId: 0,
    divisionNom:'',
  };

  divisionOptionList: DivisionResponseDto[] = [];
  loading = false;
  loadingDivision = false;
  errorMessages: string[] = [];

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private employeService = inject(EmployeService);
  private divisionService = inject(DivisionService);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadEmploye(id);
    }
  }

  loadEmploye(id: number) {
    this.employeService.getEmployeById(id).subscribe({
      next: (data: EmployeResponseDto) => {
        this.employe = { ...data };
        if (this.employe.divisionId) {
          this.divisionService.getDivisionById(this.employe.divisionId).subscribe({
            next: (div: DivisionResponseDto) => this.divisionOptionList = [div],
            error: () => console.warn('Impossible de charger la division actuelle')
          });
        }
      },
      error: () => alert('Erreur lors du chargement de l’employé')
    });
  }

  onSearchDivision(value: string) {
    if (!value) {
      this.divisionOptionList = [];
      return;
    }
    this.loadingDivision = true;
    this.divisionService.searchDivisions(value).subscribe({
      next: (data: DivisionResponseDto[]) => {
        this.divisionOptionList = data;
        this.loadingDivision = false;
      },
      error: () => {
        this.loadingDivision = false;
        console.error('Erreur lors de la recherche des divisions');
      }
    });
  }

  onSubmit(): void {
    if (!this.employe.id) return;

    if (!this.employe.nom || !this.employe.prenom || !this.employe.poste || !this.employe.email || !this.employe.divisionId) {
      this.errorMessages = ['Tous les champs sont obligatoires.'];
      return;
    }

    this.loading = true;
    this.employeService.updateEmploye(this.employe.id, this.employe).subscribe({
      next: () => {
        this.loading = false;
        alert('Employé mis à jour avec succès');
        this.router.navigate(['/admin/dashboard/employe-list']);
      },
      error: () => {
        this.loading = false;
        this.errorMessages = ['Erreur lors de la mise à jour de l’employé'];
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/dashboard/employe-list']);
  }
}
