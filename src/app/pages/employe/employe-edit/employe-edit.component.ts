import { Component, inject, OnInit } from '@angular/core';
import { EmployeResponseDto } from '../../dto/employe.models.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeService } from '../../../services/employe/employe.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-employe-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, NzFormModule, NzInputModule, NzButtonModule],
  templateUrl: './employe-edit.component.html',
  styleUrl: './employe-edit.component.css'
})
export class EmployeEditComponent implements OnInit {

  employe: EmployeResponseDto = {
    id: 0,
    nom: '',
    prenom: '',
    poste: ''
  };

  loading = false;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private employeService = inject(EmployeService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeService.getEmployeById(+id).subscribe({
        next: (data: EmployeResponseDto) => {
         
          this.employe = {
            id: data.id,
            nom: data.nom,
            prenom: data.prenom,
            poste: data.poste
          };
        },
        error: () => alert('Erreur lors du chargement de l’employé')
      });
    }
  }

  onSubmit(): void {
    if (!this.employe.id) return;
    this.loading = true;

    this.employeService.updateEmploye(this.employe.id, this.employe).subscribe({
      next: () => {
        this.loading = false;
        alert('Employé mis à jour avec succès');
        this.router.navigate(['/admin/dashboard/employe-list']);
      },
      error: () => {
        this.loading = false;
        alert('Erreur lors de la mise à jour de l’employé');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/dashboard/employe-list']);
  }

}