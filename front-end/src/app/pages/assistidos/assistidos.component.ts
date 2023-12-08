import { Component } from '@angular/core';

@Component({
  selector: 'app-assistidos',
  templateUrl: './assistidos.component.html',
  styleUrls: ['./assistidos.component.scss']
})
export class AssistidosComponent {
  nomeAssistido = 'Carlos';
  tituloPagina = `Assistido - ${this.nomeAssistido}`;
}
