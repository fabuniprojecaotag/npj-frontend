import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/autenticacao/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() subtitulo!: string;
  isMenuAtivo = false; // lógica para abrir e fechar menu de navegação
  isUserMenuAtivo = false;
  nomeUser = '';
  nomePerfil = '';

  constructor(
    private el: ElementRef,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.usuarioService.retornarTokenUsuario().subscribe({
      next: (usuario) => {
        if (usuario) {
          this.nomeUser = usuario.nome;
          this.nomePerfil = this.formatarNomePerfil(usuario.role);
        } else {
          this.nomeUser = 'Erro';
          this.nomePerfil = 'Não encontrado!';
        }
      }
    });
  }

  toggle(menu: string) {
    if (menu === 'mainMenu') {
      this.isMenuAtivo = !this.isMenuAtivo;
      this.atualizarVisibilidadeTitulo();
    } else if (menu === 'userMenu') {
      this.isUserMenuAtivo = !this.isUserMenuAtivo;
    }
  }

  @HostListener('document:click', ['$event'])
  fecharClicandoFora(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isMenuAtivo = false;
    }
  }

  private atualizarVisibilidadeTitulo() {
    const tituloElement =
      this.el.nativeElement.querySelector('.cabecalho__titulo');
    if (tituloElement) {
      if (this.isMenuAtivo) {
        tituloElement.classList.add('oculto');
      } else {
        tituloElement.classList.remove('oculto');
      }
    }
  }

  private formatarNomePerfil(nome: string): string {
    return nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();
  }
}
