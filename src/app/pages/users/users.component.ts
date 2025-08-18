import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { NzAlign, NzFlexModule, NzJustify } from 'ng-zorro-antd/flex';
import { Router } from '@angular/router';
import { UserDto } from '../dto/user.modols.dto';
import { UserService } from '../../services/user/user.service';
import { response } from 'express';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'app-users',
  standalone: true,
   imports: [ NzTableModule, NzIconModule, NzButtonModule, NzFlexModule, NzPaginationModule ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {


   userList: UserDto[]=[];
   size: NzButtonSize  = 'small';
   totalElements: number = 0;
   pageNumber: number = 0;
   sizeNumber: number = 10;

  constructor( private userService: UserService){}
   router = inject(Router)

    ngOnInit(): void {
     this.getAllUsersByPage(this.pageNumber, this.sizeNumber); 
     
    }

  getAllUsersByPage(page: number, size: number){
    this.userService.getAllUsersByPage(page, size).subscribe({
        next: (response)=>{
          console.log("PAGES ELEMENTS :: ", response)
         this.userList=response.content;
         this.totalElements = response.totalElements;
         //this.pageNumber = page + 1;
         console.log("TOTAL ELEMENTS :: ", this.totalElements)
        }
      })
  }

  onCreateUser() {
    this.router.navigate(['/add-user'])
    console.log('Créer un nouvel utilisateur');
  }

  onDetail(user: any) {
    this.router.navigate(['/detail-user', user.id])
    console.log('Afficher les détails de :', user);
    
  }

  onEdit(user: UserDto) {
    this.router.navigate(['/edit-user/', user.id])
    console.log('Modifier :', user);
    
  }

  onDelete(user: UserDto) {
      if (confirm(`Voulez-vous vraiment supprimer l'utilisateur avec l'ID ${user.id} ?`)) {
           this.userService.deleteUser(user.id!).subscribe({
      next: () => {
        console.log(`Utilisateur avec ID ${user.id} supprimé`);
        this.getAllUsersByPage(this.pageNumber, this.sizeNumber);
        },
      error: (err) => {
        console.error('Erreur lors de la suppression :', err);
      }
    });
  } else {
    console.log('Suppression annulée');
  }
}

  navigateToPage(event: number) {

    console.log('TO PAGE :: ', event);

    this.getAllUsersByPage(event - 1, this.sizeNumber);
  }


}
