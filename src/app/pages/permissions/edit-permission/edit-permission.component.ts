import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzFormItemComponent, NzFormModule } from "ng-zorro-antd/form";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzColDirective } from 'ng-zorro-antd/grid';
import { ActivatedRoute } from '@angular/router';
import { PermissionDto, PermissionResponseDto } from '../../dto/permission.models.dto';
import { PermissionService } from '../../../services/permission/permission.service';


@Component({
  selector: 'app-edit-permission',
  standalone: true,
  imports:[NzFormModule, NzFormItemComponent, NzColDirective, CommonModule, FormsModule],
  templateUrl: './edit-permission.component.html',
  styleUrl: './edit-permission.component.css'
})
export class EditPermissionComponent {
  permission!:PermissionResponseDto;
  permissionList: PermissionDto[]=[];

   constructor(private permissionService: PermissionService, private router: Router, private route: ActivatedRoute) {}


    ngOnInit(): void {
  const roleId = Number(this.route.snapshot.paramMap.get('id'));
  this.permissionService.getPermissionById(roleId).subscribe({
    next: (data) => {
      this.permission = data;
    },
    error: (err) => {
      console.error('Erreur lors du chargement des permissions :', err);
    }
  });
}

  
    onSubmit(): void  {
      if(this.permission.id)
  this.permissionService.updatePermission(this.permission.id, this.permission).subscribe({
    next: () => {
      alert('Permission modifié avec succès');
      this.router.navigate(['/permission-list']);
    },
    error: err => {
      console.error('Erreur lors de la modification :', err);
    }
  });
}


  
  onCancel() {
    window.history.back();
  }



}
