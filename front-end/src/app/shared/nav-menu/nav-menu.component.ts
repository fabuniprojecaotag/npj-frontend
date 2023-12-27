import { Component, Input, OnInit } from '@angular/core';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { PerfilService } from 'src/app/core/services/perfil.service';
import { Permissoes, Usuario } from 'src/app/core/types/usuario';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent implements OnInit {
  @Input() isMenuAtivo: boolean = false;
  panelOpenState = false;

  private userData!: Usuario;
  public moduloPermissoes!: Permissoes[];

  constructor(
    private perfilService: PerfilService,
    private cadastroService: CadastroService
  ) {}

  ngOnInit() {
    this.cadastroService.buscarMeuUsuario().subscribe({
      next: (response) => {
        this.userData = response;
        console.log(response);
        this.loadPerfis();
      }
    });
  }

  loadPerfis() {
    this.perfilService.consultar(this.userData.perfil.documentId).subscribe({
      next: (data) => {
        console.log('Perfil do Usuário do Menu:', data);
        this.moduloPermissoes = data.permissoes;
      },
      error: (err) => {
        console.log('Erro ao carregar perfil:', err);
      }
    });
  }
}
