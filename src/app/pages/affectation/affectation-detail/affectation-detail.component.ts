import { Component, inject, OnInit } from '@angular/core';
import { AffectationArticlesResponseDto } from '../../dto/affectation.models.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { AffectationService } from '../../../services/affectation/affectation.service';

@Component({
  selector: 'app-affectation-detail',
  standalone: true,
  imports: [],
  templateUrl: './affectation-detail.component.html',
  styleUrl: './affectation-detail.component.css'
})
export class AffectationDetailComponent implements OnInit {

  affectation: AffectationArticlesResponseDto = {
    id: 0,
    articleId: 0,
    employeId: 0,
    libArt: '',
    employeNom: '',
    employePrenom: '',
    employeEmail: '',
    employePoste: '',
    employeDivision: '',
    etat: '',
    dateDebut: '',
    dateFin: '',
    nbrArticle: 0
     
  };

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private affectationService = inject(AffectationService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.affectationService.getAffectationById(+id).subscribe({
        next: (data: AffectationArticlesResponseDto) => this.affectation = data,
        error: () => alert('Erreur lors du chargement de l’affectation')
      });
    }
  }

 onCancel() {
    window.history.back();
  }

}
