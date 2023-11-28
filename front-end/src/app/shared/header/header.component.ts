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
  // logica para abrir e fechar menu
  iSmenuAtivo: boolean = false;

  userData: any = {};

  constructor(private el: ElementRef, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadDataFromLocalStorage();
  }

  //TODO: mover para utilitarios
  formatFullName(fullName: string): string {
    const names = fullName.split(' ');
    const firstTwoNames = names.slice(0, 2);
    const formattedNames = firstTwoNames.map(
      (name) => name.charAt(0).toUpperCase() + name.slice(1)
    );
    const formattedFullName = formattedNames.join(' ');
    return formattedFullName;
  }

  //isso aqui pode ser transformado em um servico separado para ser reutilizado
  loadDataFromLocalStorage(): void {
    console.log('getting local');
    const userDataString = localStorage.getItem('user_data');
    console.log(userDataString);
    if (userDataString) {
      console.log(JSON.parse(userDataString));
      this.userData = JSON.parse(userDataString);
    } else {
      this.userData = null;
    }
    this.cdr.detectChanges();
  }

  toggle() {
    this.iSmenuAtivo = !this.iSmenuAtivo;
    this.atualizarVisibilidadeTitulo();
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.iSmenuAtivo = false;
    }
  }

  private atualizarVisibilidadeTitulo() {
    const tituloElement =
      this.el.nativeElement.querySelector('.cabecalho__titulo');
    if (tituloElement) {
      if (this.iSmenuAtivo) {
        tituloElement.classList.add('oculto');
      } else {
        tituloElement.classList.remove('oculto');
      }
    }
  }
}
