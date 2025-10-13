import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule, NzSelectSizeType } from 'ng-zorro-antd/select';
import { RoleResponseDto } from '../../dto/role.models.dto';
import { UserService } from '../../../services/user/user.service';
import { RoleService } from '../../../services/role/role.service';

import dayjs from 'dayjs';
import { BehaviorSubject, of } from 'rxjs';
import { debounceTime, switchMap, map, catchError } from 'rxjs/operators';
import { UserResponseDto } from '../../dto/user.modols.dto';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule
  ],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  
 user: UserResponseDto = {
    id: 0,
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    confirmPassword:'',
    email: '',
    adresse: '',
    telephone: '',
    dateNaissance: '',
    roleName: ''
  };

  confirmPassword: string = '';
  roleOptionList: RoleResponseDto[] = [];
  loadingRoles = false;
  loading = false;
  errorMessages: string[] = [];
  size: NzSelectSizeType = 'default';
  showPassword = false;
  showConfirmPassword = false;

  private roleSearch$ = new BehaviorSubject<string>('');

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);
  private roleService = inject(RoleService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getUserById(+id).subscribe({
        next: (data: UserResponseDto) => {
          this.user = data;
        },
        error: () => {
          alert("Erreur lors du chargement de l'utilisateur");
          this.router.navigate(['/admin/dashboard/users-list']);
        }
      });
    }

    this.roleSearch$
      .pipe(
        debounceTime(300),
        switchMap(term => this.searchRoles(term))
      )
      .subscribe((roles: RoleResponseDto[]) => {
        this.roleOptionList = roles;
        this.loadingRoles = false;
      });

    this.onSearchRole('');
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSearchRole(value: string): void {
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

  onSubmit(): void {
    this.errorMessages = [];
    this.loading = true;

    if (!this.user.firstname || !this.user.lastname || !this.user.username || !this.user.email) {
      this.errorMessages.push("Tous les champs obligatoires doivent être remplis.");
    }

    if (this.user.password && this.user.password !== this.confirmPassword) {
      this.errorMessages.push("Les mots de passe ne correspondent pas.");
    }

    if (this.errorMessages.length > 0) {
      this.loading = false;
      return;
    }

     const userToSend: any = {   
          id: this.user.id,
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          username: this.user.username,
          password: this.user.password,
          confirmPassword: this.user.confirmPassword,
          email: this.user.email,
          adresse: this.user.adresse,
          telephone: this.user.telephone,
          dateNaissance: this.user.dateNaissance
            ? dayjs(this.user.dateNaissance).format('YYYY-MM-DD')
            : null,
          roleName: this.user.roleName
        };

    this.userService.updateUser(this.user.id!, userToSend).subscribe({
      next: () => {
        this.loading = false;
        alert('Utilisateur mis à jour avec succès');
        this.router.navigate(['/admin/dashboard/users-list']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Erreur lors de la mise à jour :', err);
        this.errorMessages.push("Erreur : " + (err.error?.message || 'Erreur inconnue'));
      }
    });
  }

  onCancel(): void {
    window.history.back();
  }
}
