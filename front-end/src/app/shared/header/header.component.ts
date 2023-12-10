import {
  Component,
  HostListener,
  Input,
  ElementRef,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() subtitulo: string = '';
  isMenuAtivo: boolean = false; // logica para abrir e fechar menu de nav
  isUserMenuAtivo: boolean = false;
  userData: any = {};

  constructor(private el: ElementRef, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadDataFromLocalStorage();
  }

  //TODO: mover para utilitarios
  formatFullName(fullName: string): string {
    const names = (fullName && fullName.split(' ')) ?? [];
    const firstTwoNames: any = names.slice(0, 2) ?? [];
    const formattedNames = firstTwoNames.map(
      (name: any) => name.charAt(0).toUpperCase() + name.slice(1)
    );
    const formattedFullName = formattedNames.join(' ');
    return formattedFullName;
  }

  //isso aqui pode ser transformado em um servico separado para ser reutilizado
  loadDataFromLocalStorage(): void {
    console.log('getting local');
    const userDataString = localStorage.getItem('user_data');
    console.log('data do usuario:' + userDataString);
    if (userDataString) {
      console.log(JSON.parse(userDataString));
      this.userData = JSON.parse(userDataString);
    } else {
      this.userData = null;
    }
    this.cdr.detectChanges();
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
