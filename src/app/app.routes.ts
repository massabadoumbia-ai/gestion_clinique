import { Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { AddUserComponent } from './pages/users/add-user/add-user.component';
import { EditUserComponent } from './pages/users/edit-user/edit-user.component';
import { DetailUserComponent } from './pages/users/detail-user/detail-user.component';
import { AddRoleComponent } from './pages/roles/add-role/add-role.component';
import { EditRoleComponent } from './pages/roles/edit-role/edit-role.component';
import { DetailRoleComponent } from './pages/roles/detail-role/detail-role.component';
import { EditPermissionComponent } from './pages/permissions/edit-permission/edit-permission.component';
import { AddPermissionComponent } from './pages/permissions/add-permission/add-permission.component';
import { DetailPermissionComponent } from './pages/permissions/detail-permission/detail-permission.component';
import { RolesComponent } from './pages/roles/roles.component';
import { PermissionsComponent } from './pages/permissions/permissions.component';
import { AssignPermissionsComponent } from './pages/roles/assign-permissions/assign-permissions.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './services/auth/auth-guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
  { path: 'admin', loadChildren: () => import('./pages/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES) },
  {path: 'login', component: LoginComponent}
   /* { path: 'users-list', component: UsersComponent, canActivate:[AuthGuard] },
   { path: 'add-user', component: AddUserComponent, canActivate:[AuthGuard] },
   { path: 'edit-user/:id', component: EditUserComponent, canActivate:[AuthGuard] },
   { path: 'detail-user/:id', component: DetailUserComponent, canActivate:[AuthGuard] },

   { path: 'roles-list', component: RolesComponent, canActivate:[AuthGuard] },
    { path: 'add-role', component: AddRoleComponent, canActivate:[AuthGuard] },
     { path: 'edit-role/:id', component: EditRoleComponent, canActivate:[AuthGuard] },
     { path: 'detail-role', component: DetailRoleComponent, canActivate:[AuthGuard] },
     { path: 'role-permissions/:id', component: AssignPermissionsComponent, canActivate:[AuthGuard]},
     { path: 'permissions-list', component: PermissionsComponent, canActivate:[AuthGuard] },
     { path: 'edit-permission', component: EditPermissionComponent, canActivate:[AuthGuard] },
     { path: 'add-permission', component: AddPermissionComponent, canActivate:[AuthGuard]},
     { path: 'detail-permission', component: DetailPermissionComponent, canActivate:[AuthGuard]},
      */
];
