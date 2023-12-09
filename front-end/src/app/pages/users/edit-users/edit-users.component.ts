import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent {
  tituloDaPagina: string = 'Editar Usuário';

  constructor(private router: Router) {}

  editar () {
    alert('a ser implementado!');
    this.router.navigate(['/home']);
  }
}
