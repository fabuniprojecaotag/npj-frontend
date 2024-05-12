import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalExcluidoComponent } from '../modal-excluido/modal-excluido.component';

@Component({
  selector: 'app-modal-atendimento',
  templateUrl: './modal-atendimento.component.html',
  styleUrls: ['./modal-atendimento.component.scss']
})
export class ModalAtendimentoComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalExcluidoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  cancelar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    this.dialogRef.close('confirmado');
  }
}
