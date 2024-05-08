import { Component, Input } from '@angular/core';
import { Atendimento } from 'src/app/core/types/atendimento';

@Component({
  selector: 'app-card-atendimentos',
  templateUrl: './card-atendimentos.component.html',
  styleUrls: ['./card-atendimentos.component.scss']
})
export class CardAtendimentosComponent {
  @Input() atendimento!: Atendimento;
}
