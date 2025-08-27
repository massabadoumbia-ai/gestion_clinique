import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PermissionDto } from '../../dto/permission.models.dto';
import { PermissionService } from '../../../services/permission/permission.service';
import { NzFormModule } from "ng-zorro-antd/form";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-add-permission',
  standalone: true,
  templateUrl: './add-permission.component.html',
  styleUrls: ['./add-permission.component.css'],
  imports: [NzFormModule, CommonModule, FormsModule],
  encapsulation: ViewEncapsulation.None
})
export class AddPermissionComponent implements OnInit {

  permission: PermissionDto={
    name: '',
    description: '',
  };

  
  permissionList: PermissionDto[] = [];
  errorMessages: string[] = [];

  constructor(private permissionService: PermissionService, private router: Router) {}
  ngOnInit(): void {
    
  }

  onSubmit() {

    this.errorMessages = [];

    
    if (!this.permission.name || this.permission.name.trim() === '') {
      this.errorMessages.push("Le nom du rôle ne doit pas être vide.");
    }
    if (!this.permission.description || this.permission.description.trim() === '') {
      this.errorMessages.push("La description du rôle ne doit pas être vide.");
    }

   
    if (this.errorMessages.length > 0) {
      return;
    }

    this.permissionService.createPermission(this.permission).subscribe({
      next: () => {
        alert('Permission ajouté avec succès');
        this.router.navigate(['/admin/dashboard/permission-list']);
      },
      error: err => {
        console.error('Erreur lors de l\'ajout :', err);
        //alert("Erreur lors de l'ajout de l'utilisateur");
      }
    });
  }

  
  onCancel() {
    window.history.back();
  }

}
