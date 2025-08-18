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

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
   { path: 'users-list', component: UsersComponent },
   { path: 'add-user', component: AddUserComponent },
   { path: 'edit-user/:id', component: EditUserComponent },
   { path: 'detail-user/:id', component: DetailUserComponent },

   { path: 'roles-list', component: RolesComponent },
    { path: 'add-role', component: AddRoleComponent },
     { path: 'edit-role/:id', component: EditRoleComponent },
     { path: 'detail-role', component: DetailRoleComponent },
     { path: 'role-permissions/:id', component: AssignPermissionsComponent},

     { path: 'permissions-list', component: PermissionsComponent },
     { path: 'edit-permission', component: EditPermissionComponent },
     { path: 'add-permission', component: AddPermissionComponent},
     { path: 'detail-permission', component: DetailPermissionComponent }
];
