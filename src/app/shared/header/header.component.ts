import {
  Component,
  HostListener,
  Input,
  ElementRef,
  OnInit,
} from '@angular/core';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { Usuario } from 'src/app/core/types/usuario';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() subtitulo: string = '';
  isMenuAtivo: boolean = false; // logica para abrir e fechar menu de nav
  isUserMenuAtivo: boolean = false;
  userData!: Usuario;
  nomeUser: string = '';
  nomePerfil: string = '';

  constructor(
    private el: ElementRef,
    private cadastroService: CadastroService
  ) {}

  ngOnInit(): void {
    this.cadastroService.buscarMeuUsuario().subscribe({
      next: (usuario) => {
        this.userData = usuario;
        // console.log("sucesso, meu usuário: " + this.userData);
        this.nomeUser = usuario.nome;
        this.nomePerfil = this.formatarNomePerfil(usuario.role);
      },
      error: (err) => {
        alert('Não foi possível carregar usuário logado!');
        console.log("Erro ao procurar meu usuário: " + err);
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

  private formatarNomePerfil(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }
}
