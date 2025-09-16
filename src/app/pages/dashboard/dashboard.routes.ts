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
import { ArticleAddComponent } from '../articles/article-add/article-add.component';
import { ArticleDetailComponent } from '../articles/article-detail/article-detail.component';
import { ArticleEditComponent } from '../articles/article-edit/article-edit.component';
import { CategorieAddComponent } from '../categorie/categorie-add/categorie-add.component';
import { CategorieEditComponent } from '../categorie/categorie-edit/categorie-edit.component';
import { MarqueAddComponent } from '../marque/marque-add/marque-add.component';
import { MarqueEditComponent } from '../marque/marque-edit/marque-edit.component';
import { EmployeAddComponent } from '../employe/employe-add/employe-add.component';
import { EmployeEditComponent } from '../employe/employe-edit/employe-edit.component';
import { EmployeDatailComponent } from '../employe/employe-detail/employe-datail.component';
import { FournisseurAddComponent } from '../fournisseur/fournisseur-add/fournisseur-add.component';
import { FournisseurEditComponent } from '../fournisseur/fournisseur-edit/fournisseur-edit.component';
import { FournisseurDetailComponent } from '../fournisseur/fournisseur-detail/fournisseur-detail.component';
import { ReceptionAddComponent } from '../reception/reception-add/reception-add.component';
import { ReceptionEditComponent } from '../reception/reception-edit/reception-edit.component';
import { ReceptionDetailComponent } from '../reception/reception-detail/reception-detail.component';
import { ArticlesComponent } from '../articles/articles.component';
import { CategorieComponent } from '../categorie/categorie.component';
import { MarqueComponent } from '../marque/marque.component';
import { EmployeComponent } from '../employe/employe.component';
import { FournisseurComponent } from '../fournisseur/fournisseur.component';
import { ReceptionComponent } from '../reception/reception.component';
import { AffectationComponent } from '../affectation/affectation.component';
import { AffectationAddComponent } from '../affectation/affectation-add/affectation-add.component';
import { AffectationEditComponent } from '../affectation/affectation-edit/affectation-edit.component';

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

    { path: 'articles-list', component: ArticlesComponent, canActivate:[AuthGuard]},
   { path: 'article-add', component: ArticleAddComponent, canActivate:[AuthGuard]},
   { path: 'article-detail/:id', component: ArticleDetailComponent, canActivate:[AuthGuard]},
   { path: 'article-edit/:id', component: ArticleEditComponent, canActivate:[AuthGuard]},

    { path: 'affectation-list', component: AffectationComponent , canActivate:[AuthGuard]},
   { path: 'affectation-add', component: AffectationAddComponent, canActivate:[AuthGuard]},
   { path: 'affectation-edit/:id', component: AffectationEditComponent , canActivate:[AuthGuard]},

    { path: 'categorie-list', component: CategorieComponent, canActivate:[AuthGuard]},
   { path: 'categorie-add', component: CategorieAddComponent, canActivate:[AuthGuard]},
   { path: 'categorie-edit/:id', component: CategorieEditComponent, canActivate:[AuthGuard]},

    { path: 'marque-list', component: MarqueComponent, canActivate:[AuthGuard]},
   { path: 'marque-add', component: MarqueAddComponent, canActivate:[AuthGuard]},
   { path: 'marque-edit/:id', component: MarqueEditComponent, canActivate:[AuthGuard]},

    { path: 'employe-list', component: EmployeComponent, canActivate:[AuthGuard]},
   { path: 'employe-add', component: EmployeAddComponent, canActivate:[AuthGuard]},
    { path: 'employe-edit/:id', component: EmployeEditComponent, canActivate:[AuthGuard]},
     { path: 'employe-detail/:id', component: EmployeDatailComponent, canActivate:[AuthGuard]},

      { path: 'fournisseur-list', component: FournisseurComponent, canActivate:[AuthGuard]},
      { path: 'fournisseur-add', component: FournisseurAddComponent, canActivate:[AuthGuard]},
       { path: 'fournisseur-edit/:id', component: FournisseurEditComponent, canActivate:[AuthGuard]},
        { path: 'fournisseur-detail/:id', component: FournisseurDetailComponent, canActivate:[AuthGuard]},

         { path: 'reception-list', component: ReceptionComponent, canActivate:[AuthGuard]},
         { path: 'reception-add', component: ReceptionAddComponent, canActivate:[AuthGuard]},
          { path: 'reception-edit/:id', component: ReceptionEditComponent, canActivate:[AuthGuard]},
           { path: 'reception-detail/:id', component: ReceptionDetailComponent, canActivate:[AuthGuard]},
   
    ]
   },
       
];
