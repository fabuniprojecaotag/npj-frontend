import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-atalhos',
  templateUrl: './modal-atalhos.component.html',
  styleUrls: ['./modal-atalhos.component.scss']
})
export class ModalAtalhosComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalAtalhosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  fechar() {
    this.dialogRef.close();
  }
}
