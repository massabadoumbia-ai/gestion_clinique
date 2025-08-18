import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionDto } from '../dto/permission.models.dto';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { PermissionService } from '../../services/permission/permission.service';
import { NzPaginationModule } from "ng-zorro-antd/pagination";
import { RoleService } from '../../services/role/role.service';
import { RoleDto, RoleResponseDto } from '../dto/role.models.dto';


@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [NzPaginationModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {


  roleList: RoleResponseDto[] = [];
  size: NzButtonSize = 'small';
  totalElements: number = 0;
  pageNumber: number = 0;
  sizeNumber: number = 10;

  constructor(private roleService: RoleService) {}
  router = inject(Router);

  ngOnInit(): void {
    this.getAllRolesByPage(this.pageNumber, this.sizeNumber);
  }

  
  getAllRolesByPage(page: number, size: number) {
    this.roleService.getAllRoleByPage(page, size).subscribe({
      next: (response) => {
        console.log("PAGES ELEMENTS :: ", response);
        this.roleList = response.content;
        this.totalElements = response.totalElements;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des roles :', err);
      }
    });
  }

  
  onCreateRole() {
    this.router.navigate(['/add-role']);
  }

 
  onDetail(role: RoleDto) {
    this.router.navigate(['/detail-role', role.id]);
  }

 onAssignPermissions(role: RoleResponseDto) {
this.router.navigate(['/role-permissions', role.id]);
}
  onEdit(role: RoleResponseDto) {
    this.router.navigate(['/edit-role', role.id]);
  }

  
  onDelete(role: RoleResponseDto) {
    if (confirm(`Voulez-vous vraiment supprimer le role "${role.name}" ?`)) {
      this.roleService.deleteRole(role.id!).subscribe({
        next: () => {
          console.log(`Role "${role.name}" supprimée`);
          this.getAllRolesByPage(this.pageNumber, this.sizeNumber);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression :', err);
        }
      });
    }
  }

  
  navigateToPage(event: number) {
    this.getAllRolesByPage(event - 1, this.sizeNumber);
  }

}
