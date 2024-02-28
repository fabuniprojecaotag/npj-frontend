import { Component, Input, OnInit } from '@angular/core';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { Permissoes } from 'src/app/core/types/usuario';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent implements OnInit {
  @Input() isMenuAtivo: boolean = false;
  @Input() moduloPermissoes!: Permissoes[];
  panelOpenState = false;
  perfilId!: number;


  constructor(private cadastroService: CadastroService) { }

  ngOnInit(): void {
    this.cadastroService.buscarMeuUsuario().subscribe({
      next: (usuario) => {
        this.perfilId = usuario.perfil.id;
      }
    })
  }
}
