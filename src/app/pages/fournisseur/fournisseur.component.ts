import { Component, inject, OnInit } from '@angular/core';
import { NzPaginationComponent } from "ng-zorro-antd/pagination";
import { FournisseurResponseDto } from '../dto/fournisseur.models.dto';
import { FournisseurService } from '../../services/fournisseur/fournisseur.service';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { HasPermissionDirective } from '../../services/directives/has-permissions';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fournisseur',
  standalone: true,
  imports: [NzPaginationComponent, HasPermissionDirective, FormsModule,],
  templateUrl: './fournisseur.component.html',
  styleUrl: './fournisseur.component.css'
})
export class FournisseurComponent implements OnInit {


   FournisseurList: FournisseurResponseDto[]=[];
   filteredFournisseur: FournisseurResponseDto[] = [];
   filters = {
  nom: '',
  contact: '',
  nif: ''
};

   size: NzButtonSize  = 'small';
   totalElements: number = 0;
   pageNumber: number = 0;
   sizeNumber: number = 10;

  constructor( private fournisseurService: FournisseurService){}
   router = inject(Router)

    ngOnInit(): void {
     this.getAllFournisseurByPage(this.pageNumber, this.sizeNumber); 
     
    }

  getAllFournisseurByPage(page: number, size: number){
    this.fournisseurService.getAllFournisseurByPage(page, size).subscribe({
        next: (response)=>{
          console.log("PAGES ELEMENTS :: ", response)
         this.FournisseurList=response.content;
         this.filteredFournisseur = response.content;
         this.totalElements = response.totalElements;
         //this.pageNumber = page + 1;
         console.log("TOTAL ELEMENTS :: ", this.totalElements)
        }
      })
  }

  applyFilters(): void {
  const { nom, contact, nif } = this.filters;

  this.filteredFournisseur = this.FournisseurList.filter(f =>
    (!nom || f.nom?.toLowerCase().includes(nom.toLowerCase())) &&
    (!contact || f.contact?.toLowerCase().includes(contact.toLowerCase())) &&
    (!nif || f.nif?.toLowerCase().includes(nif.toLowerCase()))
  );
}

  onCreateFournisseur() {
    this.router.navigate(['/admin/dashboard/fournisseur-add'])
    console.log('Créer un nouvel utilisateur');
  }

  onDetail(fournisseur: any) {
    this.router.navigate(['/admin/dashboard/fournisseur-detail', fournisseur.id])
    console.log('Afficher les détails de :', fournisseur);
    
  }

  onEdit(fournisseur: FournisseurResponseDto) {
    this.router.navigate(['/admin/dashboard/fournisseur-edit/', fournisseur.id])
    console.log('Modifier :', fournisseur);
    
  }

  onDelete(fournisseur: FournisseurResponseDto) {
      if (confirm(`Voulez-vous vraiment supprimer l'utilisateur avec l'ID ${fournisseur.id} ?`)) {
           this.fournisseurService.deleteFournisseur(fournisseur.id!).subscribe({
      next: () => {
        console.log(`Utilisateur avec ID ${fournisseur.id} supprimé`);
        this.getAllFournisseurByPage(this.pageNumber, this.sizeNumber);
        },
      error: (err) => {
        console.error('Erreur lors de la suppression :', err);
      }
    });
  } else {
    console.log('Suppression annulée');
  }
}

  navigateToPage(event: number) {

    console.log('TO PAGE :: ', event);

    this.getAllFournisseurByPage(event - 1, this.sizeNumber);
  }


}
