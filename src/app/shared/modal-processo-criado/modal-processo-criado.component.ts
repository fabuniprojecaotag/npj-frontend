import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Processo } from 'src/app/core/types/processo';

@Component({
  selector: 'app-modal-processo-criado',
  templateUrl: './modal-processo-criado.component.html',
  styleUrls: ['./modal-processo-criado.component.scss']
})
export class ModalProcessoCriadoComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
