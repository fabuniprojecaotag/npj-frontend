import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AssistidosService } from 'src/app/core/services/assistidos.service';
import { FormsService } from 'src/app/core/services/forms.service';
import { Assistido } from 'src/app/core/types/assistido';
import { ModalCriadoComponent } from 'src/app/shared/modal-criado/modal-criado.component';
import { ModalErrosComponent } from 'src/app/shared/modal-erros/modal-erros.component';

@Component({
  selector: 'app-assistido-add',
  templateUrl: './assistido-add.component.html',
  styleUrls: ['./assistido-add.component.scss'],
})
export class AssistidoAddComponent {
  tituloDaPagina: string = 'Novo Assistido';

  constructor(
    private formAssistidosService: FormsService,
    private assistidoService: AssistidosService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  cadastrar(): void {
    const formCadastroAssistido = this.formAssistidosService.getForm();

    if (formCadastroAssistido?.valid) {
      const novoAssistido = formCadastroAssistido.getRawValue() as Assistido;
      this.assistidoService.cadastrarAssistido(novoAssistido).subscribe({
        next: (value) => {
          this.abrirModal(value);
          this.router.navigate(['/assistidos']);
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

  abrirModal(novoAssistido: Assistido) {
    this.dialog.open(ModalCriadoComponent, {
      width: '552px',
      height: '360px',
      data: { tituloCriado: 'Assistido', nome: novoAssistido.nome, email: novoAssistido.email }
    })
  }

  mostrarMensagemErro(codigoErro: string, mensagemErro: string) {
    let subtituloErro = 'Erro ao cadastrar';

    this.dialog.open(ModalErrosComponent, {
      width: '552px',
      height: '360px',
      position: { top: '0' },
      data: { codigoErro: codigoErro, subtituloErro: subtituloErro, mensagemErro: mensagemErro }
    })
  }
}
