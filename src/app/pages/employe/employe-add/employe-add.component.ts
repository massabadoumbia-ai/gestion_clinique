import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { EmployeResponseDto } from '../../dto/employe.models.dto';
import { Router } from '@angular/router';
import { EmployeService } from '../../../services/employe/employe.service';

@Component({
  selector: 'app-employe-add',
  standalone: true,
  imports: [CommonModule, FormsModule, NzFormModule, NzInputModule, NzButtonModule],
  templateUrl: './employe-add.component.html',
  styleUrl: './employe-add.component.css'
})
export class EmployeAddComponent implements OnInit {

  employe: EmployeResponseDto = {
    id: 0,
    nom: '',
    prenom: '',
    poste: '',
    email: '',
    division: '',
  };

  errorMessages: string[] = [];
  loading = false;

  constructor(private employeService: EmployeService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.errorMessages = [];
    this.loading = true;

    if (!this.employe.nom || this.employe.nom.trim().length === 0) {
      this.errorMessages.push("Le nom est obligatoire.");
    }
    if (!this.employe.prenom || this.employe.prenom.trim().length === 0) {
      this.errorMessages.push("Le prénom est obligatoire.");
    }
    if (!this.employe.poste || this.employe.poste.trim().length === 0) {
      this.errorMessages.push("Le poste est obligatoire.");
    }
    if (!this.employe.email || this.employe.email.trim().length === 0) {
      this.errorMessages.push("L'email est obligatoire.");
    }
    if (!this.employe.division || this.employe.division.trim().length === 0) {
      this.errorMessages.push("La division est obligatoire.");
    }

    if (this.errorMessages.length > 0) {
      this.loading = false;
      return;
    }

    this.employeService.createEmploye(this.employe).subscribe({
      next: () => {
        this.loading = false;
        alert('Employé ajouté avec succès');
        this.router.navigate(['/admin/dashboard/employe-list']);
      },
      error: err => {
        this.loading = false;
        console.error('Erreur lors de l\'ajout :', err);
        this.errorMessages.push("Erreur : " + err.error?.message || 'Erreur inconnue');
      }
    });
  }

  onCancel() {
    this.router.navigate(['/admin/dashboard/employe-list']);
  }
}
