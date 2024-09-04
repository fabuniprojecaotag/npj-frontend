import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-assistido',
  templateUrl: './modal-assistido.component.html',
  styleUrls: ['./modal-assistido.component.scss']
})
export class ModalAssistidoComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
