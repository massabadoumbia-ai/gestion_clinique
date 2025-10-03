import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule, NzSelectSizeType } from 'ng-zorro-antd/select';
import { ReceptionResponseDto } from '../../dto/reception.models.dto';
import { FournisseurResponseDto } from '../../dto/fournisseur.models.dto';
import { EmployeResponseDto } from '../../dto/employe.models.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceptionService } from '../../../services/reception/reception.service';
import { EmployeService } from '../../../services/employe/employe.service';
import { FournisseurService } from '../../../services/fournisseur/fournisseur.service';

@Component({
  selector: 'app-reception-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, NzFormModule, NzInputModule, NzButtonModule, NzSelectModule],
  templateUrl: './reception-edit.component.html',
  styleUrls: ['./reception-edit.component.css']
})
export class ReceptionEditComponent implements OnInit {

  reception: ReceptionResponseDto = {
    id: 0,
    numReception: '',
    dateContrat: '',
    dateReception: '',
    nbrArticle: 0,
    employeId: 0,
    fournisseurId: 0,
    pv: '',
    fournisseurNom:'',
    employeNom:'',
  };

  size: NzSelectSizeType = "default";
  employeList: EmployeResponseDto[] = [];
  fournisseurList: FournisseurResponseDto[] = [];
  errorMessages: string[] = [];
  loading = false;
  selectedPvFile: File | null = null;

  private receptionId!: number;

  constructor(
    private route: ActivatedRoute,
    private receptionService: ReceptionService,
    private employeService: EmployeService,
    private fournisseurService: FournisseurService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.receptionId = Number(this.route.snapshot.paramMap.get('id'));
    this.getReceptionById();
    this.getAllEmployes();
    this.getAllFournisseurs();
  }

  getReceptionById() {
    this.receptionService.getReceptionById(this.receptionId).subscribe({
      next: (response) => this.reception = response,
      error: err => console.error("Erreur lors du chargement de la réception :", err)
    });
  }

  getAllEmployes() {
    this.employeService.getAllEmploye().subscribe({
      next: (response) => this.employeList = response,
      error: err => console.error("Erreur lors du chargement des employés :", err)
    });
  }

  getAllFournisseurs() {
    this.fournisseurService.getAllFournisseur().subscribe({
      next: (response) => this.fournisseurList = response,
      error: err => console.error("Erreur lors du chargement des fournisseurs :", err)
    });
  }

  onPvSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedPvFile = file;
    }
  }

  onSubmit() {
    this.errorMessages = [];
    this.loading = true;

    if (!this.reception.numReception) this.errorMessages.push("Le numéro de réception est obligatoire.");
    if (!this.reception.dateContrat) this.errorMessages.push("La date du contrat est obligatoire.");
    if (!this.reception.dateReception) this.errorMessages.push("La date de réception est obligatoire.");
    if (!this.reception.nbrArticle || this.reception.nbrArticle <= 0) this.errorMessages.push("Le nombre d'articles doit être supérieur à 0.");
    if (!this.reception.employeNom) this.errorMessages.push("L'employé est obligatoire.");
    if (!this.reception.fournisseurNom) this.errorMessages.push("Le fournisseur est obligatoire.");

    if (this.errorMessages.length > 0) {
      this.loading = false;
      return;
    }

    const formData = new FormData();
    formData.append('reception', new Blob([JSON.stringify(this.reception)], { type: 'application/json' }));
    if (this.selectedPvFile) {
      formData.append('pv', this.selectedPvFile);
    }

    this.receptionService.updateReception(this.receptionId, formData).subscribe({
      next: () => {
        this.loading = false;
        alert('Réception mise à jour avec succès');
        this.router.navigate(['/admin/dashboard/receptions-list']);
      },
      error: (err) => {
        this.loading = false;
        console.error("Erreur lors de la mise à jour :", err);
        this.errorMessages.push("Erreur : " + (err.error?.message || "Impossible de mettre à jour la réception."));
      }
    });
  }

  onCancel() {
    window.history.back();
  }
}
