import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-erros',
  templateUrl: './modal-erros.component.html',
  styleUrls: ['./modal-erros.component.scss']
})
export class ModalErrosComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
