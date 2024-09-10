import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalErrosComponent } from 'src/app/shared/components/modal-erros/modal-erros.component';

@Injectable({
  providedIn: 'root'
})
export class MensagemErroService {

  constructor(private dialog: MatDialog) { }

  mostrarMensagemErro(codigoErro: number, mensagemErro: string) {
    this.dialog.open(ModalErrosComponent, {
      width: '552px',
      height: 'auto',
      position: { top: '0' },
      data: { codigoErro: codigoErro, mensagemErro: mensagemErro }
    });
  }
}
