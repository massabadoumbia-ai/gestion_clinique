import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { Console } from 'console';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  token: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  loading = false;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {}

  togglePassword() {
  this.showPassword = !this.showPassword;
}


  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  onSubmit() {
    this.loading= true;
    if (this.newPassword !== this.confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    this.userService.resetPassword(this.token, this.newPassword, this.confirmPassword)
      .subscribe({
        next: (resp) => {
          this.loading= false;
          alert("Mot de passe réinitialisé avec succès !");
          this.router.navigate(['/login']);
        },
        error: err =>{ 
          this.loading= false;
          console.error('erreur lors de la reinitialisation:', err)
          alert(err.error.messages)
        }
        
      });
  }
}
