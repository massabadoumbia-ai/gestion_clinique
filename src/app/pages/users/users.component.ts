import { Component, ViewEncapsulation } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { NzAlign, NzFlexModule, NzJustify } from 'ng-zorro-antd/flex';



@Component({
  selector: 'app-users',
  standalone: true,
   imports: [ NzTableModule, NzIconModule, NzButtonModule, NzFlexModule ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent {

  
  listOfData = [
    { key: '1', nom: 'Brown', prenom: 'Jhon', age: 32, adresse: 'New York', tel: 78785566 },
    { key: '2', nom: 'Green' ,prenom: 'Jim', age: 42, adresse: 'London ', tel: 77441122},
    { key: '3', nom: 'Black', prenom: 'Joe', age: 32, adresse: 'Sidney ', tel: 76669933 },
    { key: '4', nom: 'Sparck',prenom: 'Anna', age: 28, adresse: 'Sidney ', tel: 79229933 },
    { key: '5', nom: 'Mcgreen',prenom: 'Gerald',age: 32, adresse: 'London' , tel: 76625893 },
    { key: '6', nom: 'Seydou', prenom: 'Keita', age: 28, adresse: 'Bamako', tel: 76123456 },
    { key: '7', nom: 'Fatoumata',prenom: 'Diallo',age: 35, adresse: 'Sikasso', tel: 78111234 },
    { key: '8', nom: 'Mamadou', prenom: 'Traoré',age: 41, adresse: 'Kayes', tel: 79112233 }
  ];
  size: NzButtonSize  = 'small'
  

  onCreateUser() {
    console.log('Créer un nouvel utilisateur');
  }

  onDetail(user: any) {
    console.log('Afficher les détails de :', user);
  }

  onEdit(user: any) {
    console.log('Modifier :', user);
  }

  onDelete(user: any) {
    console.log('Supprimer :', user);
  }
}
