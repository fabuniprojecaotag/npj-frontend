import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-atalhos',
  templateUrl: './card-atalhos.component.html',
  styleUrls: ['./card-atalhos.component.scss']
})
export class CardAtalhosComponent {
  @Input() iconeCard!: string;
  @Input() textoCard!: string;
  @Input() linkCard!: string;
}
