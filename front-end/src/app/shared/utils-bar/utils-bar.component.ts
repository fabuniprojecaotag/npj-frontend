import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-utils-bar',
  templateUrl: './utils-bar.component.html',
  styleUrls: ['./utils-bar.component.scss']
})
export class UtilsBarComponent {
  constructor(private localation: Location){}

  avancar(): void {
    this.localation.forward();
  }

  voltar(): void {
    this.localation.back();
  }
}
