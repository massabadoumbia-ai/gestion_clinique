import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { LoginComponent } from '../login/login.component';
import { AuthGuard } from '../../services/auth/auth-guard';

export const WELCOME_ROUTES: Routes = [
  { path: '', component: WelcomeComponent, canActivate: [AuthGuard] }
];
