import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AtendimentosService } from 'src/app/atendimentos/services/atendimentos.service';
import { FormsService } from 'src/app/core/services/forms.service';
import { Atendimento } from 'src/app/core/types/atendimento';
import { ModalErrosComponent } from 'src/app/shared/modal-erros/modal-erros.component';

@Component({
  selector: 'app-atendimento-add',
  templateUrl: './atendimento-add.component.html',
  styleUrls: ['./atendimento-add.component.scss'],
})
export class AtendimentoAddComponent implements OnInit {
  tituloPagina = 'Nova Ficha';
  tipoFicha!: string;

  constructor(
    private formAtendimentoService: FormsService,
    private atendimentoService: AtendimentosService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.tipoFicha = this.route.snapshot.paramMap.get('ficha') as string;
  }

  cadastrar() {
    const formAtendimento = this.formAtendimentoService.getForm();

    if (formAtendimento?.valid) {
      const novoAtendimento = formAtendimento.getRawValue() as Atendimento;

      this.atendimentoService.cadastrarAtendimento(novoAtendimento).subscribe({
        next: () => {
          alert('Cadastro realizado!');
          this.router.navigate(['/atendimentos/list']);
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
