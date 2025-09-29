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
import { UserDto } from '../../dto/user.modols.dto';
import dayjs from 'dayjs';
import { BehaviorSubject, of } from 'rxjs';
import { debounceTime, switchMap, map, catchError } from 'rxjs/operators';


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
  user: UserDto = {
    id: 0,
    firstname: '',
    lastname: '',
    username: '',
    dateNaissance: '',
    adresse: '',
    email: '',
    telephone: '',
    roleName: '',
    password: '',
    confirmPassword: ''
  };

  roleOptionList: RoleResponseDto[] = [];
  loadingRoles = false;
  size: NzSelectSizeType = 'large';
  loading = false;
  showPassword = false;
  showConfirmPassword = false;

  private roleSearch$ = new BehaviorSubject<string>('');

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);
  private roleService = inject(RoleService);

   togglePassword() {
  this.showPassword = !this.showPassword;
}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getUserById(+id).subscribe({
        next: (data: UserDto) => {
          this.user = data;
        },
        error: () => {
          alert('Erreur lors du chargement de l’utilisateur');
          this.router.navigate(['/users']);
        }
      });
    }

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
    this.loading = true;

    const userToSend = {
      ...this.user,
      dateNaissance: this.user.dateNaissance ? dayjs(this.user.dateNaissance).format('YYYY-MM-DD') : ''
    };

    if (this.user.id) {
      this.userService.updateUser(this.user.id, userToSend).subscribe({
        next: () => {
          this.loading = false;
          alert('Utilisateur mis à jour avec succès');
          this.router.navigate(['/users']);
        },
        error: () => {
          this.loading = false;
          alert("Erreur lors de la mise à jour de l'utilisateur");
        }
      });
    }
  }

  onCancel(): void {
    window.history.back();
  }
}
