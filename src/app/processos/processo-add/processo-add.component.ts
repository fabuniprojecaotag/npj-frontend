import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormsService } from 'src/app/core/services/forms.service';
import { ProcessosService } from 'src/app/processos/services/processos.service';
import { Processo } from 'src/app/core/types/processo';
import { ModalErrosComponent } from 'src/app/shared/modal-erros/modal-erros.component';
import { ModalProcessoComponent } from 'src/app/shared/modal-processo/modal-processo-criado.component';

@Component({
  selector: 'app-processo-add',
  templateUrl: './processo-add.component.html',
  styleUrls: ['./processo-add.component.scss'],
})
export class ProcessoAddComponent {
  tituloPagina = 'Processo';

  constructor(
    private processsoService: ProcessosService,
    private formService: FormsService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  cadastrar() {
    const formCadastroProcesso = this.formService.getForm();

    if (formCadastroProcesso?.valid) {
      const novoCadastro = formCadastroProcesso.getRawValue() as Processo;
      this.processsoService.cadastraProcesso(novoCadastro).subscribe({
        next: () => {
          this.abrirModal(novoCadastro);
          this.router.navigate(['/processos/list']);
        },
        error: (err) => {
          let errorMessage: string = '';

          switch (err.status) {
            case 401: {
              errorMessage = "Não Autorizado!";
              this.mostrarMensagemErro('401', errorMessage);
              break;
            }
            case 403: {
              errorMessage = "Cadastro não foi aceito no servidor!";
              this.mostrarMensagemErro('403', errorMessage);
              break;
            }
            case 404: {
              errorMessage = "Recurso não encontrado!";
              this.mostrarMensagemErro('404', errorMessage);
              break;
            }
            case 408: {
              errorMessage = "Servidor demorou muito para responder!";
              this.mostrarMensagemErro('408', errorMessage);
              break;
            }
            case 422: {
              errorMessage = `Padrão não correspondente ao do servidor!<br>`;
              err.error.errors.forEach((error: any) => {
                errorMessage += `${error.field}: ${error.message}<br>`;
              });
              this.mostrarMensagemErro('422', errorMessage);
              break;
            }
            default: {
              errorMessage = `Por favor tente mais tarde!`;
              this.mostrarMensagemErro('Desconhecido', errorMessage);
              break;
            }
          }
        },
      });
    }
  }

  abrirModal(novoProcesso: Processo) {
    this.dialog.open(ModalProcessoComponent, {
      width: '552px',
      height: '360px',
      data: {
        operacao: 'criado',
        numero: novoProcesso.numero,
        nome: novoProcesso.nome,
        atendimentoId: novoProcesso.atendimentoId,
      },
    });
  }

  mostrarMensagemErro(codigoErro: string, mensagemErro: string) {
    let subtituloErro: string = 'Erro ao cadastrar';

    this.dialog.open(ModalErrosComponent, {
      width: '552px',
      height: '360px',
      position: { top: '0' },
      data: { codigoErro: codigoErro, subtituloErro: subtituloErro, mensagemErro: mensagemErro }
    })
  }
}
