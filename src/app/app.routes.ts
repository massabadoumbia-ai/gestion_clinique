import { Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { AddUserComponent } from './pages/users/add-user/add-user.component';
import { EditUserComponent } from './pages/users/edit-user/edit-user.component';
import { DetailUserComponent } from './pages/users/detail-user/detail-user.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
   { path: 'users-list', component: UsersComponent },
   { path: 'add-user', component: AddUserComponent },
   { path: 'edit-user', component: EditUserComponent },
   { path: 'detail-user', component: DetailUserComponent }
];
