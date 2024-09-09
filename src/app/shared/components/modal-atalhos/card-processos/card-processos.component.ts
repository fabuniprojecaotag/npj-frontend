import { Component, Input } from '@angular/core';
import { Processo } from 'src/app/core/types/processo';

@Component({
  selector: 'app-card-processos',
  templateUrl: './card-processos.component.html',
  styleUrls: ['./card-processos.component.scss']
})
export class CardProcessosComponent {
  @Input() processo!: Processo;
}
