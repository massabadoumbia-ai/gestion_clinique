import { Component, OnInit } from '@angular/core';
import { RoleDto } from '../../dto/role.models.dto';
import { Router } from '@angular/router';
import { RoleService } from '../../../services/role/role.service';
import { NzFormItemComponent, NzFormModule } from "ng-zorro-antd/form";
import { NzColDirective } from "ng-zorro-antd/grid";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-role',
  standalone: true,
  imports: [NzFormItemComponent, NzColDirective, CommonModule, FormsModule,NzFormModule],
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css'
})
export class AddRoleComponent implements OnInit{
  role: RoleDto={
    name:'',
    description:''
  };


  roleList: RoleDto[] = [];
  constructor(private roleService: RoleService, private router: Router) {}
  
    ngOnInit(): void {

    }
  
    onSubmit() {
    this.roleService.createRole(this.role).subscribe({
      next: () => {
        alert('Role ajouté avec succès');
        this.router.navigate(['/admin/dashboard/role-list']);
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
