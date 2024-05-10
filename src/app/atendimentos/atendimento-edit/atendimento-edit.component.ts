import { Atendimento } from 'src/app/core/types/atendimento';
import { FormsService } from './../../core/services/forms.service';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AtendimentosService } from 'src/app/atendimentos/services/atendimentos.service';
import { ModalErrosComponent } from 'src/app/shared/modal-erros/modal-erros.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-atendimento-edit',
  templateUrl: './atendimento-edit.component.html',
  styleUrls: ['./atendimento-edit.component.scss']
})
export class AtendimentoEditComponent {
  tituloPagina = 'Editar - ';
  tipoFicha!: string;
  idAtendimento!: string;
  atendimento!: Atendimento;
  form!: FormGroup<any> | null;

  constructor(
    private formService: FormsService,
    private atendimentoService: AtendimentosService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.tipoFicha = this.route.snapshot.paramMap.get('ficha') as string;
    this.idAtendimento = this.route.snapshot.paramMap.get('id') as string;
    this.tituloPagina += this.idAtendimento;

    this.atendimentoService.consultaAtendimento(this.idAtendimento).subscribe({
      next: (atendimento) => {
        this.atendimento = atendimento;
        this.carregarFormulario();
      }
    })
  }

  carregarFormulario() {
    this.form = this.formService.getForm();
    this.form?.patchValue({
      status: this.atendimento.status,
      area: this.atendimento.area,
      instante: this.atendimento.instante,
      ficha: this.atendimento.ficha,
      historico: this.atendimento.historico?.map(item => {
        const { id, ...rest } = item;
        return rest;
      }),
      prazoEntregaDocumentos: this.atendimento.prazoEntregaDocumentos,
      envolvidos: this.atendimento.envolvidos
    });
  }

  editar() {
    const dadosAtualizados: any = {
      "@type": this.form?.value['@type'],
      status: this.form?.value.status,
      area: this.form?.value.area,
      ficha: this.form?.value.ficha,
      historico: this.form?.value.historico,
      prazoEntregaDocumentos: this.form?.value.prazoEntregaDocumentos,
      envolvidos: this.form?.value.envolvidos
    };

    this.atendimentoService.atualizarAtendimento(dadosAtualizados, this.idAtendimento).subscribe({
      next: () => {
        alert('Atendimento atualizado com sucesso!');
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

  excluir(){
    this.atendimentoService.excluirAtendimento(this.idAtendimento).subscribe({
      next: () => {
        alert('Sucesso ao excluir atendimento!');
      },
      error: (err) => {
        alert('Erro ao excluir atendimento');
      }
    })
  }

  mostrarMensagemErro(codigoErro: string, mensagemErro: string) {
    let subtituloErro = 'Erro ao editar';

    this.dialog.open(ModalErrosComponent, {
      width: '552px',
      height: '360px',
      position: { top: '0' },
      data: { codigoErro: codigoErro, subtituloErro: subtituloErro, mensagemErro: mensagemErro }
    })
  }
}
