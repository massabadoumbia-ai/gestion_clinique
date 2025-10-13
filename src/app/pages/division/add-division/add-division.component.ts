import { Component, inject, OnInit } from '@angular/core';
import { DivisionResponseDto } from '../../dto/division.models.dto';
import { Router } from '@angular/router';
import { DivisionService } from '../../../services/division/division.service';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-add-division',
  standalone: true,
  imports: [CommonModule, FormsModule, NzFormModule, NzInputModule, NzButtonModule],
  templateUrl: './add-division.component.html',
  styleUrl: './add-division.component.css'
})
export class AddDivisionComponent implements OnInit {

  division: DivisionResponseDto = {
    id:0,
    nom: '' ,
    description:''
  }; 
  errorMessages: string[] = [];
  loading: boolean = false;

  private router = inject(Router);

  constructor(private divisionService: DivisionService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.errorMessages = [];
    if (!this.division.nom || this.division.nom.trim() === '') {
      this.errorMessages.push('Le nom de la division est obligatoire.');
      return;
    }

    this.loading = true;
    this.divisionService.createDivision(this.division).subscribe({
      next: (response) => {
        console.log('Division créée avec succès', response);
        this.loading = false;
        this.router.navigate(['/admin/dashboard/division-list']); 
      },
      error: (err) => {
        console.error('Erreur lors de la création de la division', err);
        this.errorMessages.push('Une erreur est survenue lors de la création.');
        this.loading = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/dashboard/division-list']);
  }
}