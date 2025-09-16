import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { MarqueDto } from '../../dto/marque.models.dto';
import { MarqueService } from '../../../services/marque/marque.service';

@Component({
  selector: 'app-marque-add',
  standalone: true,
  imports: [CommonModule, FormsModule, NzFormModule, NzInputModule, NzButtonModule],
  templateUrl: './marque-add.component.html',
  styleUrl: './marque-add.component.css',
  providers: [MarqueService]
})
export class MarqueAddComponent implements OnInit {
  
  marque: MarqueDto = {
    id: 0,
    nom: ''
  };

  size: NzSelectSizeType = "default";
  loading = false;
  errorMessages: string[] = [];

  constructor(private marqueService: MarqueService, private router: Router) {}

  ngOnInit(): void {
   
  }

  onSubmit() {
    this.errorMessages = [];
    this.loading = true;

    if (!this.marque.nom || this.marque.nom.trim().length < 2) {
      this.errorMessages.push("Le nom de la marque doit contenir au moins 2 caractères.");
    }

    if (this.errorMessages.length > 0) {
      this.loading = false;
      return;
    }  

    this.marqueService.createMarque(this.marque).subscribe({
      next: () => {
        this.loading = false;
        alert('Marque ajoutée avec succès');
        this.router.navigate(['/admin/dashboard/marque-list']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Erreur lors de la création :', err);
        this.errorMessages = err.error?.messages || ['Erreur lors de la création de la marque'];
      }
    });
  }

  onCancel() {
    this.router.navigate(['/admin/dashboard/marque-list']);
  }
}
