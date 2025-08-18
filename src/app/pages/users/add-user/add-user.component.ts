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
    this.userService.createUser(this.user).subscribe({
      next: () => {
        alert('Utilisateur ajouté avec succès');
        this.router.navigate(['/users-list']);
      },
      error: err => {
        console.error('Erreur lors de l\'ajout :', err);
        //alert("Erreur lors de l'ajout de l'utilisateur");
      }
    });
  }


  onCancel() {
    window.history.back();
  }
}
