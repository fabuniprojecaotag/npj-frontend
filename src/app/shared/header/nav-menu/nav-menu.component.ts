import { Component, Input, OnInit } from '@angular/core';
import { CadastroService } from 'src/app/autenticacao/services/cadastro.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent implements OnInit {
  @Input() isMenuAtivo: boolean = false;
  panelOpenState = false;
  perfilNome!: string;

  constructor(private cadastroService: CadastroService) { }

  ngOnInit(): void {
    this.cadastroService.buscarMeuUsuario().subscribe({
      next: (usuario) => {
        this.perfilNome = usuario.role.toUpperCase();
      }
    })
  }
}
