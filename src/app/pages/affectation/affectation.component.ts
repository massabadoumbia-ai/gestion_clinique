import { Component, inject, OnInit } from '@angular/core';
import { NzPaginationComponent, NzPaginationModule } from "ng-zorro-antd/pagination";
import { HasPermissionDirective } from '../../services/directives/has-permissions';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AffectationArticlesResponseDto } from '../dto/affectation.models.dto';
import { Router } from '@angular/router';
import { AffectationService } from '../../services/affectation/affectation.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-affectation',
  standalone: true,
  imports: [NzPaginationComponent, NzTableModule, NzIconModule, NzButtonModule, NzFlexModule, NzPaginationModule, HasPermissionDirective],
  templateUrl: './affectation.component.html',
  styleUrl: './affectation.component.css'
})
export class AffectationComponent implements OnInit {


   affectationList: AffectationArticlesResponseDto[]=[];
   size: NzButtonSize  = 'small';
   totalElements: number = 0;
   pageNumber: number = 0;
   sizeNumber: number = 10;

  constructor( private AffectationService: AffectationService, private fb: FormBuilder){}
   router = inject(Router)

    ngOnInit(): void {
     this.getAllAffectationByPage(this.pageNumber, this.sizeNumber); 
      
    }

  getAllAffectationByPage(page: number, size: number){
    this.AffectationService.getAllAffectationByPage(page, size).subscribe({
        next: (response)=>{
          console.log("PAGES ELEMENTS :: ", response)
         this.affectationList=response.content;
         this.totalElements = response.totalElements;
         //this.pageNumber = page + 1;
         console.log("TOTAL ELEMENTS :: ", this.totalElements)
        }
      })
  }

  onCreateAffectation() {
    this.router.navigate(['/admin/dashboard/affectation-add'])
    console.log('Créer une nouvelle affectation');
  }

  onDetail(affectation:AffectationArticlesResponseDto) {
    this.router.navigate(['/admin/dashboard/affectation-detail', affectation.id])
    console.log('Afficher les détails de :', affectation);
    
  }

  onEdit(affectation: AffectationArticlesResponseDto) {
    this.router.navigate(['/admin/dashboard/affectation-edit/', affectation.id])
    console.log('Modifier :', affectation);
    
  }

  onReaffect(affectation: AffectationArticlesResponseDto) {
  this.router.navigate(['/admin/dashboard/affectation-reaffecter', affectation.id]);
   console.log('Reaffecter :', affectation);
}

  onDelete(affectation: AffectationArticlesResponseDto) {
      if (confirm(`Voulez-vous vraiment supprimer l'afffectation avec l'ID ${affectation.id} ?`)) {
           this.AffectationService.deleteAffectation(affectation.id!).subscribe({
      next: () => {
        console.log(`Affectation avec ID ${affectation.id} supprimé`);
        this.getAllAffectationByPage(this.pageNumber, this.sizeNumber);
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

    this.getAllAffectationByPage(event - 1, this.sizeNumber);
  }


}

