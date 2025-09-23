import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { UserDto } from '../../dto/user.modols.dto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-user',
  standalone: true,
  imports: [],
  templateUrl: './detail-user.component.html',
  styleUrl: './detail-user.component.css'
})
export class DetailUserComponent implements OnInit {

   user: UserDto = {
      id: 0,
      firstname: '',
      lastname: '',
      username: '',
     dateNaissance: new Date ,
      adresse: '',
      email: '',
      telephone: '',
      roleName: '',
      password: '',
      confirmPassword: ''
    };
  
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private userService = inject(UserService);
    
  
    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.userService.getUserById(+id).subscribe({
          next: (data: UserDto) => this.user = data,
          error: () => alert('Erreur lors du chargement de l’utilisateur')
        });
      }
    }
    onSubmit(): void {
    if (this.user.id) {
      this.userService.updateUser(this.user.id, this.user).subscribe({
        next: () => {
          alert('Utilisateur mis à jour avec succès');
          this.router.navigate(['/users']);
        },
        error: () => alert("Erreur lors de la mise à jour de l'utilisateur")
      });
    }
  }

  onCancel() {
    window.history.back();
  }

  }
