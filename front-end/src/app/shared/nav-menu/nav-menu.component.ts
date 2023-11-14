import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  @Input() iSmenuAtivo: boolean = false;
  @Input() logo: string = './assets/images/gproFundoRoxo.png';
}
