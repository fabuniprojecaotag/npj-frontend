import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsService } from 'src/app/core/services/forms.service';
import { ProcessosService } from 'src/app/core/services/processos.service';
import { Processo } from 'src/app/core/types/processo';
import { ModalErrosComponent } from 'src/app/shared/modal-erros/modal-erros.component';
import { ModalExcluirProcessoComponent } from 'src/app/shared/modal-excluir-processo/modal-excluir-processo.component';

@Component({
  selector: 'app-processo-edit',
  templateUrl: './processo-edit.component.html',
  styleUrls: ['./processo-edit.component.scss'],
})
export class ProcessoEditComponent implements OnInit {
  tituloPagina = 'Editar Processo';
  numeroParam!: string;
  processo!: Processo;
  form!: FormGroup<any> | null;

  constructor(
    private processsoService: ProcessosService,
    private formService: FormsService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.numeroParam = this.route.snapshot.paramMap.get('numero') as string;
    this.processsoService
      .consultarProcesso(this.numeroParam)
      .subscribe((callback) => {
        this.processo = callback;
        console.log(callback);

        this.carregarFormulario();
      });
  }

  carregarFormulario() {
    this.form = this.formService.getForm();
    this.form?.patchValue({
      atendimentoId: this.processo.atendimentoId,
      numero: this.processo.numero,
      nome: this.processo.nome,
      dataDistribuicao: new Date(this.processo.dataDistribuicao),
      vara: this.processo.vara,
      forum: this.processo.forum,
      status: this.processo.status,
    });
  }

  editarProcesso() {
    const dadosAtualizados: Processo = {
      //numero :this.form?.value.numero, não enviar CPF, pois ocorrera conflito entre documentId e CPF
      nome: this.form?.value.nome,
      dataDistribuicao: this.form?.value.dataDistribuicao,
      vara: this.form?.value.vara,
      forum: this.form?.value.forum,
      atendimentoId: this.form?.value.atendimentoId,
      status: this.form?.value.status
    };
    this.processsoService
      .editarProcesso(this.numeroParam, dadosAtualizados)
      .subscribe({
        next: () => {
          this.router.navigate(['/processos']);
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

  excluirProcesso(idProcesso: string) {
    this.processsoService.excluirProcesso(idProcesso).subscribe({
      next: () => {
        this.router.navigate(['/processos']);
      },
      error: () => {
        alert('Erro ao excluir processo!');
      },
    });
  }

  abrirModal() {
    this.dialog.open(ModalExcluirProcessoComponent, {
      width: '372px',
      height: '228px',
      data: {
        numero: this.processo.numero,
        deletar: () => this.excluirProcesso(this.numeroParam),
      },
    });
  }

  mostrarMensagemErro(codigoErro: string, mensagemErro: string) {
    let subtituloErro: string = 'Erro ao editar';

    this.dialog.open(ModalErrosComponent, {
      width: '552px',
      height: '360px',
      position: { top: '0' },
      data: { codigoErro: codigoErro, subtituloErro: subtituloErro, mensagemErro: mensagemErro }
    })
  }
}
