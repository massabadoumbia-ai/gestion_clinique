import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
   standalone: true,
    imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  email: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post('http://localhost:8080/api/users/forgot-password', { email: this.email })
      .subscribe({
        next: () => {
          alert("Un email de réinitialisation a été envoyé !");
          this.router.navigate(['/reset-password']);
        },
        error: err => alert(err.error.message || "Erreur lors de l'envoi de l'email")
      });
  }
}
