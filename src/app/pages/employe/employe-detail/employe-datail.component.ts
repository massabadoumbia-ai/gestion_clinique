import { Component, inject, OnInit } from '@angular/core';
import { EmployeResponseDto } from '../../dto/employe.models.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeService } from '../../../services/employe/employe.service';

@Component({
  selector: 'app-employe-datail',
  standalone: true,
  imports: [],
  templateUrl: './employe-datail.component.html',
  styleUrl: './employe-datail.component.css'
})
export class EmployeDatailComponent implements OnInit {

  employe: EmployeResponseDto = {
    id: 0,
    nom: '',
    prenom: '',
    poste: ''
  };

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private employeService = inject(EmployeService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeService.getEmployeById(+id).subscribe({
        next: (data: EmployeResponseDto) => this.employe = data,
        error: () => alert('Erreur lors du chargement de l’employé')
      });
    }
  }

  onSubmit(): void {
    if (this.employe.id) {
      this.employeService.updateEmploye(this.employe.id, this.employe).subscribe({
        next: () => {
          alert('Employé mis à jour avec succès');
          this.router.navigate(['/admin/dashboard/employes-list']);
        },
        error: () => alert("Erreur lors de la mise à jour de l'employé")
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin/dashboard/employes-list']);
  }
}