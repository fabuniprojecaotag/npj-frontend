import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-excluido',
  templateUrl: './modal-excluido.component.html',
  styleUrls: ['./modal-excluido.component.scss']
})
export class ModalExcluidoComponent {
  funcaoDeletar: (() => void) | undefined;

  constructor(
    public dialogRef: MatDialogRef<ModalExcluidoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {}

  deletar() {
    console.log('Função deletar chamada...');
    console.log('Valor de this.funcaoDeletar', this.funcaoDeletar);
    if (this.funcaoDeletar) {
      this.funcaoDeletar();
    } else {
      console.error('Função de exclusão não definida.');
    }

    this.dialogRef.close();
  }

}
