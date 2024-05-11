import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { CadastroService } from 'src/app/autenticacao/services/cadastro.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() subtitulo: string = '';
  isMenuAtivo: boolean = false; // logica para abrir e fechar menu de nav
  isUserMenuAtivo: boolean = false;
  nomeUser: string = '';
  nomePerfil: string = '';

  constructor(
    private el: ElementRef,
    private cadastroService: CadastroService
  ) { }

  ngOnInit(): void {
    this.cadastroService.buscarMeuUsuario().subscribe({
      next: (usuario) => {
        this.nomeUser = usuario.nome;
        this.nomePerfil = this.formatarNomePerfil(usuario.role);
      },
      error: (err) => { }
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
