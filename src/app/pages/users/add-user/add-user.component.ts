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
import { BehaviorSubject, of } from 'rxjs';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import  dayjs from 'dayjs';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule, NzFormModule, NzInputModule, NzButtonModule, NzSelectModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
  providers: [UserService]
})
export class AddUserComponent implements OnInit {
  user: UserDto = {
    firstname: '',
    lastname: '',
    username: '',
    dateNaissance:'',
    adresse: '',
    email: '',
    roleName: '',  
    telephone: '',
    password: '',
    confirmPassword: ''
  };

  size: NzSelectSizeType = 'default';
  roleOptionList: RoleResponseDto[] = [];
  loadingRoles = false;
  loading = false;
  errorMessages: string[] = [];
  showPassword = false;
  showConfirmPassword = false;

  private roleSearch$ = new BehaviorSubject<string>('');

  constructor(
    private userService: UserService,
    private router: Router,
    private roleService: RoleService
  ) {}


   togglePassword() {
  this.showPassword = !this.showPassword;
}  

  ngOnInit(): void {
    this.roleSearch$
      .pipe(
        debounceTime(300),
        switchMap((term) => this.searchRoles(term))
      )
      .subscribe((roles: RoleResponseDto[]) => {
        this.roleOptionList = roles;
        this.loadingRoles = false;
      });

    this.onSearchRole('');
  }

  onSearchRole(value: string) {
    this.loadingRoles = true;
    this.roleSearch$.next(value); 
  }

  private searchRoles(term: string) {
    return this.roleService.getAllRoles().pipe(
      map((list: RoleResponseDto[]) =>
        list.filter((r) => r.name.toLowerCase().includes(term.toLowerCase()))
      ),
      catchError(() => of([]))
    );
  }

  onSubmit() {
    this.errorMessages = [];
    this.loading = true;

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
      this.loading = false;
      return;
    }

    const userToSend = {
      ...this.user,
      dateNaissance: this.user.dateNaissance? dayjs(this.user.dateNaissance).format('YYYY-MM-DD'): '',
    };

    this.userService.createUser(this.user).subscribe({
      next: () => {
        this.loading = false;
        alert('Utilisateur ajouté avec succès');
        this.router.navigate(['/admin/dashboard/users-list']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Erreur lors de l\'ajout :', err);
        this.errorMessages.push("Erreur : " + err.error.message);
      }
    });
  }

  onCancel() {
    window.history.back();
  }
}
