import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-excluido',
  templateUrl: './modal-excluido.component.html',
  styleUrls: ['./modal-excluido.component.scss']
})
export class ModalExcluidoComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalExcluidoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  openDialog() {
    this.data.deletar();
    this.dialogRef.close();
  }

  cancelar () {
    this.dialogRef.close();
}

}
