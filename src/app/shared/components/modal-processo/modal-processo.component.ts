import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-processo',
  templateUrl: './modal-processo.component.html',
  styleUrls: ['./modal-processo.component.scss']
})
export class ModalProcessoComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
