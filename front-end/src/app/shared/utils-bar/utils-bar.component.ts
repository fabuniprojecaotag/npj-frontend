import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-utils-bar',
  templateUrl: './utils-bar.component.html',
  styleUrls: ['./utils-bar.component.scss']
})
export class UtilsBarComponent {
  constructor(private location: Location){}

  avancar(): void {
    this.location.forward();
  }

  voltar(): void {
    this.location.back();
  }

  recarregar() {
    window.location.reload();
  }
}
