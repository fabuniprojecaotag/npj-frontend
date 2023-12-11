import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-criado',
  templateUrl: './modal-criado.component.html',
  styleUrls: ['./modal-criado.component.scss']
})
export class ModalCriadoComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
