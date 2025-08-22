import { Routes } from '@angular/router';
import { AuthGuard } from '../../services/auth/auth-guard';
import { DashboardComponent } from './dashboard.component';
import { AddPermissionComponent } from '../permissions/add-permission/add-permission.component';
import { DetailPermissionComponent } from '../permissions/detail-permission/detail-permission.component';
import { EditPermissionComponent } from '../permissions/edit-permission/edit-permission.component';
import { PermissionsComponent } from '../permissions/permissions.component';
import { AddRoleComponent } from '../roles/add-role/add-role.component';
import { AssignPermissionsComponent } from '../roles/assign-permissions/assign-permissions.component';
import { DetailRoleComponent } from '../roles/detail-role/detail-role.component';
import { EditRoleComponent } from '../roles/edit-role/edit-role.component';
import { RolesComponent } from '../roles/roles.component';
import { AddUserComponent } from '../users/add-user/add-user.component';
import { DetailUserComponent } from '../users/detail-user/detail-user.component';
import { EditUserComponent } from '../users/edit-user/edit-user.component';
import { UsersComponent } from '../users/users.component';

export const DASHBOARD_ROUTES: Routes = [
  { path: 'dashboard', component: DashboardComponent,
    children:[
{ path: 'users-list', component: UsersComponent, canActivate:[AuthGuard] },
   { path: 'add-user', component: AddUserComponent, canActivate:[AuthGuard] },
   { path: 'edit-user/:id', component: EditUserComponent, canActivate:[AuthGuard] },
   { path: 'detail-user/:id', component: DetailUserComponent, canActivate:[AuthGuard] },

   { path: 'roles-list', component: RolesComponent, canActivate:[AuthGuard] },
    { path: 'add-role', component: AddRoleComponent, canActivate:[AuthGuard] },
     { path: 'edit-role/:id', component: EditRoleComponent, canActivate:[AuthGuard] },
     { path: 'detail-role', component: DetailRoleComponent, canActivate:[AuthGuard] },
     { path: 'role-permissions/:id', component: AssignPermissionsComponent, canActivate:[AuthGuard]},
     { path: 'permissions-list', component: PermissionsComponent, canActivate:[AuthGuard] },
     { path: 'edit-permission/:id', component: EditPermissionComponent, canActivate:[AuthGuard] },
     { path: 'add-permission', component: AddPermissionComponent, canActivate:[AuthGuard]},
     { path: 'detail-permission', component: DetailPermissionComponent, canActivate:[AuthGuard]},

    ]
   },
       
];
