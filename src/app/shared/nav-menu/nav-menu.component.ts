import { Component, Input, OnInit } from '@angular/core';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { PerfilService } from 'src/app/core/services/perfil.service';
import { Permissoes, Usuario } from 'src/app/core/types/usuario';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent {
  @Input() isMenuAtivo: boolean = false;
  @Input() moduloPermissoes!: Permissoes[];
  panelOpenState = false;


  constructor() {}
}
