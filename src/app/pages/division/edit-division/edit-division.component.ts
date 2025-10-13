import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Router, ActivatedRoute } from '@angular/router';
import { DivisionResponseDto } from '../../dto/division.models.dto';
import { DivisionService } from '../../../services/division/division.service';
@Component({
  selector: 'app-edit-division',
  standalone: true,
  imports: [CommonModule, FormsModule, NzFormModule, NzInputModule, NzButtonModule],
  templateUrl: './edit-division.component.html',
  styleUrls: ['./edit-division.component.css']
})
export class EditDivisionComponent implements OnInit {

  division: DivisionResponseDto = {
    id: 0,
    nom: '',
    description:''
  }; 

  divisionId!: number;
  errorMessages: string[] = [];
  loading: boolean = false;

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor(private divisionService: DivisionService) {}

  ngOnInit(): void {
    this.divisionId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.divisionId) {
      this.getDivisionById(this.divisionId);
    }
  }

  getDivisionById(id: number): void {
    this.divisionService.getDivisionById(id).subscribe({
      next: (response: DivisionResponseDto) => {
        this.division = response;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de la division', err);
        this.errorMessages.push('Impossible de récupérer les données de la division.');
      }
    });
  }

  onSubmit(): void {
    this.errorMessages = [];
    if (!this.division.nom || this.division.nom.trim() === '') {
      this.errorMessages.push('Le nom de la division est obligatoire.');
      return;
    }

    this.loading = true;
    this.divisionService.updateDivision(this.divisionId, this.division).subscribe({
      next: (response) => {
        console.log('Division mise à jour avec succès', response);
        this.loading = false;
        this.router.navigate(['/admin/dashboard/division-list']);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour de la division', err);
        this.errorMessages.push('Une erreur est survenue lors de la mise à jour.');
        this.loading = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/dashboard/division-list']);
  }
}
