import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { Router } from '@angular/router';
import { UserDto, UserResponseDto } from '../dto/user.modols.dto';
import { UserService } from '../../services/user/user.service';
import { HasPermissionDirective } from '../../services/directives/has-permissions';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    NzTableModule,
    NzIconModule,
    NzButtonModule,
    NzFlexModule,
    NzPaginationModule,
    HasPermissionDirective,  FormsModule, NzSelectModule,FormsModule,
        NzFormModule,
        NzInputModule,
        NzButtonModule,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {

  userList: UserDto[] = [];
  filteredUsers: UserDto[] = [];

  filters = {
    lastname: '',
   firstname: '',
    username: '',
    telephone: '',
     role: ''
  };

   roleList: string[] =[];
  size: NzButtonSize = 'small';
  totalElements: number = 0;
  pageNumber: number = 0;
  sizeNumber: number = 10;

  constructor(private userService: UserService) {}

  router = inject(Router);

  ngOnInit(): void {
    this.getAllUsersByPage(this.pageNumber, this.sizeNumber);
   
  }

  loadRoles(): void {
  this.userService.getAllRoles().subscribe({
    next: (roles) => {
      console.log('ROLES DISPONIBLES ::', roles);
      this.roleList = roles;
    },
    error: (err) => {
      console.error('Erreur lors du chargement des rôles :', err);
    }
  });
}


  applyFilters(): void {
    const {lastname, firstname, username, telephone, role } = this.filters;

    this.filteredUsers = this.userList.filter(user =>
      (!lastname || user.lastname?.toLowerCase().includes(lastname.toLowerCase())) &&
      (!firstname || user.firstname?.toLowerCase().includes(firstname.toLowerCase())) &&
      (!username || user.username?.toLowerCase().includes(username.toLowerCase())) &&
      (!telephone || user.telephone?.toLowerCase().includes(telephone.toLowerCase())) &&
       (!role || user.roleName?.toLowerCase().includes(role.toLowerCase()))

    );
  }

  getAllUsersByPage(page: number, size: number): void {
    this.userService.getAllUsersByPage(page, size).subscribe({
      next: (response) => {
        console.log('PAGES ELEMENTS :: ', response);
        this.userList = response.content;
        this.filteredUsers = response.content; 
        this.totalElements = response.totalElements;
        console.log('TOTAL ELEMENTS :: ', this.totalElements);

       this.roleList = this.userList
  .map(u => u.roleName)
  .filter((v): v is string => typeof v === 'string')
  .filter((v, i, a) => a.indexOf(v) === i);

      },
      error: (err) => {
        console.error('Erreur lors du chargement des utilisateurs :', err);
      }
    });
  }

  onCreateUser(): void {
    this.router.navigate(['/admin/dashboard/add-user']);
  }

  onDetail(user: UserDto): void {
    this.router.navigate(['/admin/dashboard/detail-user', user.id]);
  }

  onEdit(user: UserDto): void {
    this.router.navigate(['/admin/dashboard/edit-user', user.id]);
  }

  onDelete(user: UserDto): void {
    if (confirm(`Voulez-vous vraiment supprimer l'utilisateur ${user.username} ?`)) {
      this.userService.deleteUser(user.id!).subscribe({
        next: () => {
          console.log(`Utilisateur avec ID ${user.id} supprimé`);
          this.getAllUsersByPage(this.pageNumber, this.sizeNumber);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression :', err);
        }
      });
    }
  }

  navigateToPage(event: number): void {
    console.log('TO PAGE :: ', event);
    this.getAllUsersByPage(event - 1, this.sizeNumber);
  }
}
