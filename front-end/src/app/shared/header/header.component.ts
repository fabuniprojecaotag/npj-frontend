import { Component, HostListener, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() subtitulo: string = '';
  // logica para abrir e fechar menu
  iSmenuAtivo: boolean = false;

  constructor(private el: ElementRef) { }

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
    const tituloElement = this.el.nativeElement.querySelector('.cabecalho__titulo');
    if (tituloElement) {
      if (this.iSmenuAtivo) {
        tituloElement.classList.add('oculto');
      } else {
        tituloElement.classList.remove('oculto');
      }
    }
  }
}
