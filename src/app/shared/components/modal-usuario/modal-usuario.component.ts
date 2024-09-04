import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.scss']
})
export class ModalUsuarioComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
