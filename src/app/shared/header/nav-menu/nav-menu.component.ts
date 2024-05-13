import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent implements OnInit {
  panelOpenState = false;
  @Input() isMenuAtivo = false;
  @Input() perfilNome!: string;

  constructor() { }

  ngOnInit(): void {
    this.perfilNome = this.perfilNome.toUpperCase();
  }
}
