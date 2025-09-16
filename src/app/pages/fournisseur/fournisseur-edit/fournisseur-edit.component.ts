import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FournisseurResponseDto } from '../../dto/fournisseur.models.dto';
import { FournisseurService } from '../../../services/fournisseur/fournisseur.service';

@Component({
  selector: 'app-fournisseur-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, NzFormModule, NzInputModule, NzButtonModule],
  templateUrl: './fournisseur-edit.component.html',
  styleUrls: ['./fournisseur-edit.component.css']
})
export class FournisseurEditComponent implements OnInit {

  fournisseur: FournisseurResponseDto = { id: 0, nom: '', contact: '', nif: '', adresse: '' };
  errorMessages: string[] = [];
  loading = false;

  constructor(
    private fournisseurService: FournisseurService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fournisseurService.getFournisseurById(+id).subscribe({
        next:  (data: FournisseurResponseDto) => this.fournisseur = data,
       error: () => alert('Erreur lors du chargement du fournisseur')
      });
    }
  }

  onSubmit() {
    this.errorMessages = [];
    this.loading = true;

    if (!this.fournisseur.nom) this.errorMessages.push("Le nom est obligatoire.");
    if (!this.fournisseur.contact) this.errorMessages.push("Le contact est obligatoire.");
    if (!this.fournisseur.nif) this.errorMessages.push("Le NIF est obligatoire.");
    if (!this.fournisseur.adresse) this.errorMessages.push("L'adresse est obligatoire.");

    if (this.errorMessages.length > 0) {
      this.loading = false;
      return;
    }

    this.fournisseurService.updateFournisseur(this.fournisseur.id, this.fournisseur).subscribe({
      next: () => {
        this.loading = false;
        alert('Fournisseur modifié avec succès');
        this.router.navigate(['/admin/dashboard/fournisseurs']);
      },
      error: () =>{
          this.loading= false;
           alert("Erreur lors de la mise à jour du fournisseur")
      }
    });
  }

  onCancel() {
    window.history.back();
  }
}
