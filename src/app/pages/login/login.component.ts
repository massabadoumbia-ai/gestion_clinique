import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
        console.log('Connexion réussie ✅, Token :', res.token);
        const permissions = this.authService.getUserPermissions();
      console.log('Permissions de cet utilisateur : ', permissions);
        this.router.navigate(['/admin/dashboard']); // redirection
      },
      error: () => {
        this.errorMessage = "Nom d'utilisateur ou mot de passe incorrect";
      }
    });
  }
  
 
}










  

