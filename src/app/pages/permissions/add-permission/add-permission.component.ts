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

  constructor(private permissionService: PermissionService, private router: Router) {}
  ngOnInit(): void {
    
  }

  onSubmit() {
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
