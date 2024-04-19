import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-excluir-processo',
  templateUrl: './modal-excluir-processo.component.html',
  styleUrls: ['./modal-excluir-processo.component.scss']
})
export class ModalExcluirProcessoComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalExcluirProcessoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  openDialog() {
    this.data.deletar();
    this.dialogRef.close();
  }

  cancelar() {
    this.dialogRef.close();
  }
}
