import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ReceptionService } from '../../../services/reception/reception.service';
import { ReceptionResponseDto } from '../../dto/reception.models.dto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reception-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reception-detail.component.html',
  styleUrls: ['./reception-detail.component.css']
})
export class ReceptionDetailComponent implements OnInit {

  reception: ReceptionResponseDto = {
    id: 0,
    numReception: '',
    dateContrat: '',
    dateReception: '',
    nbrArticle: 0,
    employeNom: '',
    fournisseurNom: '',
  };

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private receptionService = inject(ReceptionService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.receptionService.getReceptionById(+id).subscribe({
        next: (data: ReceptionResponseDto) => this.reception = data,
        error: (err) => {
          console.error('Erreur lors du chargement de la réception :', err);
          alert('Impossible de charger la réception.');
          this.router.navigate(['/admin/dashboard/receptions-list']);
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/admin/dashboard/reception-list']);
  }
}
