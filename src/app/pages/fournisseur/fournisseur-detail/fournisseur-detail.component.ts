import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FournisseurService } from '../../../services/fournisseur/fournisseur.service';
import { FournisseurResponseDto } from '../../dto/fournisseur.models.dto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fournisseur-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fournisseur-detail.component.html',
  styleUrls: ['./fournisseur-detail.component.css']
})
export class FournisseurDetailComponent implements OnInit {

  fournisseur: FournisseurResponseDto = {
    id:0,
    nom: '',
    contact: '',
    nif: '',
    adresse: ''
  };

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fournisseurService = inject(FournisseurService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fournisseurService.getFournisseurById(+id).subscribe({
        next: (data: FournisseurResponseDto) => this.fournisseur = data,
        error: () => {
          alert('Erreur lors du chargement du fournisseur');
          this.router.navigate(['/admin/dashboard/fournisseurs-list']);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin/dashboard/fournisseurs-list']);
  }
}
