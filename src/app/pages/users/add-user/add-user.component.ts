import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule, NzSelectSizeType } from 'ng-zorro-antd/select';
import { UserService } from '../../../services/user/user.service';
import { RoleService } from '../../../services/role/role.service';
import { RoleResponseDto } from '../../dto/role.models.dto';
import { UserDto } from '../../dto/user.modols.dto';


@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule, NzFormModule, NzInputModule, NzButtonModule, NzSelectModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
  providers: [UserService]
})
export class AddUserComponent implements OnInit {
  user:UserDto = {
    firstname: '',
    lastname: '',
    username: '',
    dateNaissance: new Date,
    adresse: '',
    email: '',
    roleName: '',
    telephone: '',
    password: '',
    confirmPassword: '',
    
  };

  size: NzSelectSizeType = "default"

    roleList: RoleResponseDto[]= [];
    errorMessages: string[] = [];
   showPassword: boolean = false;
   showConfirmPassword: boolean = false;


  constructor(private userService: UserService, private router: Router, private roleService: RoleService) {}
  
  ngOnInit(): void {
     this.getAllRoles();
  }


  getAllRoles(){
         this.roleService.getAll().subscribe({
          next: (response) =>{
            this.roleList=response

          } 
         })
  }



  
  
  onSubmit() {
     this.errorMessages = [];

  
  if (!this.user.lastname) this.errorMessages.push("Le nom ne doit pas être vide.");
  if (!this.user.firstname) this.errorMessages.push("Le prénom ne doit pas être vide.");
  if (!this.user.username) this.errorMessages.push("Le nom d'utilisateur est obligatoire.");
  if (!this.user.dateNaissance) this.errorMessages.push("La date de naissance est obligatoire.");
  if (!this.user.adresse) this.errorMessages.push("L'adresse est obligatoire.");
  if (!this.user.email) this.errorMessages.push("L'email est obligatoire.");
  if (this.user.telephone.length !== 8) this.errorMessages.push("Le téléphone doit contenir 8 chiffres.");
  if (!this.user.password) this.errorMessages.push("Le mot de passe est obligatoire.");
  if (this.user.password !== this.user.confirmPassword) this.errorMessages.push("Les mots de passe ne correspondent pas.");
  if (!this.user.roleName) this.errorMessages.push("Le rôle est obligatoire.");

  
  if (this.errorMessages.length > 0) {
    return;
  }

 
  this.userService.createUser(this.user).subscribe({
    next: () => {
      alert('Utilisateur ajouté avec succès');
      this.router.navigate(['/admin/dashboard/users-list']);
    },
    error: err => {
      console.error('Erreur lors de l\'ajout :', err);
      this.errorMessages.push("Erreur : " + err.error.message);
    }
  });
}


  onCancel() {
    window.history.back();
  }
}
