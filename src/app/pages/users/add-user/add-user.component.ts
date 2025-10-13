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
import { BehaviorSubject, of } from 'rxjs';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import dayjs from 'dayjs';
import { UserResponseDto } from '../../dto/user.modols.dto';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule, NzFormModule, NzInputModule, NzButtonModule, NzSelectModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
  providers: [UserService]
})
export class AddUserComponent implements OnInit {

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

  ngOnInit(): void {
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

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
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

   

    if (this.errorMessages.length > 0) {
      this.loading = false;
      return;
    }

    const userToSend: any = {   
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

    this.userService.createUser(userToSend).subscribe({
      next: () => {
        this.loading = false;
        alert('Utilisateur ajouté avec succès');
        this.router.navigate(['/admin/dashboard/user-list']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Erreur lors de l\'ajout :', err);
        this.errorMessages.push("Erreur : " + (err.error?.message || 'Erreur inconnue'));
      }
    });
  }

  onCancel() {
    window.history.back();
  }
}
