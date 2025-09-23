import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule, NzSelectSizeType } from 'ng-zorro-antd/select';
import { RoleDto } from '../../dto/role.models.dto';
import { UserService } from '../../../services/user/user.service';
import { RoleService } from '../../../services/role/role.service';
import { UserDto } from '../../dto/user.modols.dto';


@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule,FormsModule,NzFormModule,NzInputModule,NzButtonModule,NzSelectModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
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

  roleList: RoleDto[] = [];
  size: NzSelectSizeType = 'large';
  loading = false;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);
  private roleService = inject(RoleService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getUserById(+id).subscribe({
        next: (data: UserDto) => this.user = data,
        error: () => alert('Erreur lors du chargement de l’utilisateur')
      });
    }

    this.roleService.getAllRoles().subscribe({
      next: (roles: RoleDto[]) => this.roleList = roles,
      error: () => alert('Erreur lors du chargement des rôles')
    });
  }

  onSubmit(): void {
    this.loading=true;
    if (this.user.id) {
      this.userService.updateUser(this.user.id, this.user).subscribe({
        next: () => {
          this.loading= false;
          alert('Utilisateur mis à jour avec succès');
          this.router.navigate(['/users']);
        },
        error: () =>{
          this.loading= false;
           alert("Erreur lors de la mise à jour de l'utilisateur")
           }
      });
    }
  }

  onCancel() {
    window.history.back();
  }
}
