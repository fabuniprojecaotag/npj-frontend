import { Component, HostListener, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() subtitulo: string = '';
  iSmenuAtivo: boolean = false;

  constructor(private el: ElementRef) {}

  toggle() {
    this.iSmenuAtivo = !this.iSmenuAtivo;
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.iSmenuAtivo = false;
    }
  }
}
