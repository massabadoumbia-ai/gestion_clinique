import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AuthService } from '../../services/auth/auth.service';
import { HasPermissionDirective } from '../../services/directives/has-permissions';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, HasPermissionDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isCollapsed = false;
constructor(private router: Router, private authService: AuthService ) {}

   deconnecter() {
    // supprimer le token du localestorage
   this.authService.logout();
    // rediriger vers la page login         
    this.router.navigate(['/login']);   
    
  }
}
