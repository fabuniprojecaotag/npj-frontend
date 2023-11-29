import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent {
  @Input() nome!: string;
  @Input() tipoUsuario: string = "";
  @Input() isMenuAtivo: boolean = false;

  clearLocalStorage() {
    localStorage.clear();
  }
}
