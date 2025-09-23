import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { MarqueDto, MarqueResponseDto } from '../../dto/marque.models.dto';
import { MarqueService } from '../../../services/marque/marque.service';

@Component({
  selector: 'app-marque-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, NzFormModule, NzInputModule, NzButtonModule],
  templateUrl: './marque-edit.component.html',
  styleUrl: './marque-edit.component.css',
  providers: [MarqueService]
})
export class MarqueEditComponent implements OnInit {

  marque: MarqueResponseDto = {
    id: 0,
    nom: '',
    articlesId: 0
  };

  size: NzSelectSizeType = "default";
  loading = false;
  errorMessages: string[] = [];

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private marqueService = inject(MarqueService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.marqueService.getMarqueById(+id).subscribe({
        next: (data: MarqueResponseDto) => this.marque = data,
        error: () => alert('Erreur lors du chargement de la marque')
      });
    }
  }

  onSubmit(): void {
    this.errorMessages = [];
    this.loading = true;

    if (!this.marque.nom || this.marque.nom.trim().length < 2) {
      this.errorMessages.push("Le nom de la marque doit contenir au moins 2 caractères.");
    }

    if (this.errorMessages.length > 0) {
      this.loading = false;
      return;
    }

    if (this.marque.id) {
      this.marqueService.updateMarque(this.marque.id, this.marque).subscribe({
        next: () => {
          this.loading = false;
          alert('Marque mise à jour avec succès');
          this.router.navigate(['/admin/dashboard/marque-']);
        },
        error: (err) => {
          this.loading = false;
          console.error('Erreur lors de la mise à jour :', err);
          this.errorMessages = err.error?.messages || ['Erreur lors de la mise à jour de la marque'];
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin/dashboard/marque-list']);
  }
}
