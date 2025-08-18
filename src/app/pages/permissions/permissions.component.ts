import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionDto } from '../dto/permission.models.dto';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { PermissionService } from '../../services/permission/permission.service';
import { NzPaginationModule } from "ng-zorro-antd/pagination";


@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [NzPaginationModule],
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.css'
})
export class PermissionsComponent implements OnInit {

  permissionList: PermissionDto[] = [];
  size: NzButtonSize = 'small';
  totalElements: number = 0;
  pageNumber: number = 0;
  sizeNumber: number = 10;

  constructor(private permissionService: PermissionService) {}
  router = inject(Router);

  ngOnInit(): void {
    this.getAllPermissionsByPage(this.pageNumber, this.sizeNumber);
  }

  
  getAllPermissionsByPage(page: number, size: number) {
    this.permissionService.getAllPermissionByPage(page, size).subscribe({
      next: (response) => {
        console.log("PAGES ELEMENTS :: ", response);
        this.permissionList = response.content;
        this.totalElements = response.totalElements;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des permissions :', err);
      }
    });
  }

  
  onCreatePermission() {
    this.router.navigate(['/add-permission']);
  }

 
  onDetail(permission: PermissionDto) {
    this.router.navigate(['/detail-permission', permission.id]);
  }

 
  onEdit(permission: PermissionDto) {
    this.router.navigate(['/edit-permission', permission.id]);
  }

  
  onDelete(permission: PermissionDto) {
    if (confirm(`Voulez-vous vraiment supprimer la permission "${permission.name}" ?`)) {
      this.permissionService.deletePermission(permission.id!).subscribe({
        next: () => {
          console.log(`Permission "${permission.name}" supprimée`);
          this.getAllPermissionsByPage(this.pageNumber, this.sizeNumber);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression :', err);
        }
      });
    }
  }

  
  navigateToPage(event: number) {
    this.getAllPermissionsByPage(event - 1, this.sizeNumber);
  }

}
