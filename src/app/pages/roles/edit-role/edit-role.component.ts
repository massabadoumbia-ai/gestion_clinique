import { Component, OnInit } from '@angular/core';
import { RoleDto, RoleResponseDto } from '../../dto/role.models.dto';
import { RoleService } from '../../../services/role/role.service';
import { Router } from '@angular/router';
import { NzFormItemComponent, NzFormModule } from "ng-zorro-antd/form";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzColDirective } from 'ng-zorro-antd/grid';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-role',
  standalone: true,
  imports: [NzFormModule, NzFormItemComponent, NzColDirective, CommonModule, FormsModule],
  templateUrl: './edit-role.component.html',
  styleUrl: './edit-role.component.css'
})
export class EditRoleComponent implements OnInit {

  role!: RoleResponseDto;
roleList: RoleDto[] = [];
loading = false;
  constructor(private roleService: RoleService, private router: Router, private route: ActivatedRoute) {}
  
    ngOnInit(): void {
  const roleId = Number(this.route.snapshot.paramMap.get('id'));
  this.roleService.getRoleById(roleId).subscribe({
    next: (data) => {
      this.role = data;
    },
    error: (err) => {
      console.error('Erreur lors du chargement du rôle :', err);
    }
  });
}

  
    onSubmit(): void  {
      this.loading=true;
      if(this.role.id)
  this.roleService.updateRole(this.role.id, this.role).subscribe({
    next: () => {
      this.loading=false;
      alert('Rôle modifié avec succès');
      this.router.navigate(['/role-list']);
    },
    error: err => {
      this.loading=false;
      console.error('Erreur lors de la modification :', err);
    }
  });
}


  
  onCancel() {
    window.history.back();
  }







 
  }


