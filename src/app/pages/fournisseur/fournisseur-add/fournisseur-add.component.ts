import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FournisseurResponseDto } from '../../dto/fournisseur.models.dto';
import { FournisseurService } from '../../../services/fournisseur/fournisseur.service';


@Component({
  selector: 'app-fournisseur-add',
  standalone: true,
  imports: [CommonModule, FormsModule, NzFormModule, NzInputModule, NzButtonModule],
  templateUrl: './fournisseur-add.component.html',
  styleUrls: ['./fournisseur-add.component.css']
})
export class FournisseurAddComponent implements OnInit {

  fournisseur: FournisseurResponseDto = { id: 0, nom: '', contact: '', nif: '', adresse: '' };
  errorMessages: string[] = [];
  loading = false;

  constructor(private fournisseurService: FournisseurService, private router: Router) {}

  ngOnInit(): void {}

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

    this.fournisseurService.createFournisseur(this.fournisseur).subscribe({
      next: () => {
        this.loading = false;
        alert('Fournisseur ajouté avec succès');
        this.router.navigate(['/admin/dashboard/fournisseurs-list']);
      },
      error: err => {
        this.loading = false;
        console.error('Erreur lors de l\'ajout :', err);
        this.errorMessages.push("Erreur : " + err.error.message);
      }
    });
  }

  onCancel() {
    window.history.back();
  }
}
