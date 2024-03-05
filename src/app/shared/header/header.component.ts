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
  nomeUser: string = 'Nome';
  nomePerfil: string = 'Perfil';

  constructor(private el: ElementRef, private cadastroService: CadastroService) { }

  ngOnInit(): void {
    this.cadastroService.buscarMeuUsuario().subscribe({
      next: (usuario) => {
        console.log(usuario);

        this.userData = usuario;
        this.nomeUser = usuario.nome;
        this.nomePerfil = usuario.role;
      },
      error: (err) => {
        console.log("Erro ao procurar usuário: " + err);
      }
    })
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
}
