import { Component } from '@angular/core';

@Component({
  selector: 'app-assistidos-edit',
  templateUrl: './assistidos-edit.component.html',
  styleUrls: ['./assistidos-edit.component.scss']
})
export class AssistidosEditComponent {
  tituloDaPagina: string = 'Editar Assistido - Nome';

  editar() {
    alert('a implementar!');
  }
}
