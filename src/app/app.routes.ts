import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
  { path: 'admin', loadChildren: () => import('./pages/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES) },
  {path: 'login', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
    {path: '**', component: NotfoundComponent},


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
