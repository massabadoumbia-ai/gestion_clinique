import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTransferModule, TransferItem, TransferChange, TransferDirection } from 'ng-zorro-antd/transfer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { RolePermissionsDto, RolePermissionsResponseDto } from '../../dto/rolepermissions.models.dto';
import { RolePermissionsService } from '../../../services/role-permissions/rolepermissions.service';
import { RoleService } from '../../../services/role/role.service';
import { RoleDto } from '../../dto/role.models.dto';
import { PermissionService } from '../../../services/permission/permission.service';
import { PermissionDto, PermissionResponseDto } from '../../dto/permission.models.dto';

@Component({
  selector: 'app-assign-permission',
  standalone: true,
  imports: [CommonModule, FormsModule, NzTransferModule, NzButtonModule],
  templateUrl: './assign-permissions.component.html',
  styleUrls: ['./assign-permissions.component.css']
})
export class AssignPermissionsComponent implements OnInit {

  roleName: string = '';
  assignedPermissions: string[] = [];
  availablePermissions: string[] = [];
  selectedPermissions: string[] = [];
  permissionsList: TransferItem[] = [];

  constructor(
    private rolePermissionsService: RolePermissionsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private roleService: RoleService,
    private permissionService: PermissionService
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.getRoleById(+id);
    } else {

      this.getAllPermissions();
    }
  }


  getRoleById(id: number) {
    this.roleService.getRoleById(id).subscribe({
      next: (res: RoleDto) => {
        this.roleName = res.name;
        this.loadPermissions(res.name);
      }
    });
  }


  loadPermissions(roleName: string) {
    this.rolePermissionsService.getPermissions(roleName).subscribe({
      next: (res: RolePermissionsResponseDto) => {
        console.log(" Permissions assignes  ::", res.permissions);

        this.assignedPermissions = res.permissions
        this.getAllPermissions();
      }
    });
  }

  getAllPermissions() {
    this.permissionService.getAllPermissions().subscribe({
      next: (permissions: PermissionDto[]) => {

        this.availablePermissions = permissions.map(p => p.name);
        this.buildTransferList();
      },
      error: (err: any) => console.error('Erreur de la récupération des permissions :', err)
    });
  }



  buildTransferList() {
    const available = this.availablePermissions ?? [];
    const assigned = this.assignedPermissions ?? [];

    console.log("ALL AVAILABLE PERMISSIONS :: ", available);
    console.log("ALL ASSINED PERMISSIONS :: ", assigned);

    this.permissionsList = [
      ...available
        .filter(p => !assigned.includes(p))
        .map(p => ({ key: p, title: p, direction: 'left' as TransferDirection })),
      ...assigned.map(p => ({ key: p, title: p, direction: 'right' as TransferDirection }))
    ];
  }


  onChange(event: TransferChange): void {

    this.selectedPermissions = event.list
      .filter(item => item.direction === 'right')
      .map(item => item.title);

    if (event.from === 'left' && event.to === 'right') {
      console.log("DIRECTION DE GAUCHE VERS LA DROITE")

      const dto: RolePermissionsDto = {
        roleName: this.roleName,
        permissions: this.selectedPermissions
      };
      this.rolePermissionsService.assignPermissions(dto).subscribe({
        next: (res: RolePermissionsResponseDto) => {
          this.assignedPermissions = res.permissions;
          this.selectedPermissions = [];
          this.loadPermissions(this.roleName);

          alert('Permissions assignées avec succès !');
        },
        error: (err) => console.error('Erreur assignation permissions :', err)
      });
    }
     else if (event.from === 'right' && event.to === 'left') {
    console.log("DIRECTION DE DROITE VERS LA GAUCHE");

    const dto: RolePermissionsDto = {
      roleName: this.roleName,
      permissions: event.list.map(item => item.title) 
    };

    this.rolePermissionsService.removePermissions(dto).subscribe({
      next: (res: RolePermissionsResponseDto) => {
        this.assignedPermissions = res.permissions;
        this.loadPermissions(this.roleName);

        alert('Permissions retirées avec succès !');
      },
      error: (err) => console.error('Erreur suppression permissions :', err)
    });
  }
}





  assignPermissions() {
    const dto: RolePermissionsDto = {
      roleName: this.roleName,
      permissions: this.selectedPermissions
    };
    this.rolePermissionsService.assignPermissions(dto).subscribe({
      next: (res: RolePermissionsResponseDto) => {
        this.assignedPermissions = res.permissions;
        this.selectedPermissions = [];
        this.loadPermissions(this.roleName);

        alert('Permissions assignées avec succès !');
      },
      error: (err) => console.error('Erreur assignation permissions :', err)
    });
  }

  back(): void {
    window.history.back();
  }
}
