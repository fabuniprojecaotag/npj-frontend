import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/autenticacao/services/usuario.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent {
  @Input() nome!: string;
  @Input() tipoUsuario: string = "";
  @Input() isMenuAtivo: boolean = false;

  constructor (private router: Router, private userService: UsuarioService) {}

  logout() {
    this.userService.logout();
    this.router.navigate(['/users/login']);
  }
}
