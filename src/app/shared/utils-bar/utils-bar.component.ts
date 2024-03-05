import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-utils-bar',
  templateUrl: './utils-bar.component.html',
  styleUrls: ['./utils-bar.component.scss']
})
export class UtilsBarComponent {
  constructor(private location: Location,public router: Router ){}

  isFormButtonsAvailable(): any {

    const mapRoutes:any = {
      "/processos": {show:true,add:"novo-processo"},
    }

    return mapRoutes[this.router.url] ?? {show:false};
  }

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
