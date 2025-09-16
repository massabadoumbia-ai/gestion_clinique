import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';


@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  email: string = '';
  loading = false;

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.loading= true;
    this.userService.forgotPassword(this.email).subscribe({
      next: () => {
        this.loading= false;
        alert("Un email de réinitialisation a été envoyé !");
        this.router.navigate(['/login']);
      },
      error: err => {
        this.loading= false;
        alert(err.error || "Erreur lors de l'envoi de l'email")
        }
    });
  }
}
