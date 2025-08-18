import { Component, OnInit } from '@angular/core';
import { RoleDto } from '../../dto/role.models.dto';
import { RoleService } from '../../../services/role/role.service';
import { Router } from '@angular/router';
import { NzFormItemComponent, NzFormModule } from "ng-zorro-antd/form";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzColDirective } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-edit-role',
  standalone: true,
  imports: [NzFormModule, NzFormItemComponent, NzColDirective, CommonModule, FormsModule],
  templateUrl: './edit-role.component.html',
  styleUrl: './edit-role.component.css'
})
export class EditRoleComponent implements OnInit {

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
        this.router.navigate(['/role-list']);
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


