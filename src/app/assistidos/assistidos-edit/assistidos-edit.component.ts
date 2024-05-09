import { AssistidoCivil, AssistidoTrabalhista } from './../../core/types/assistido';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AssistidosService } from 'src/app/core/services/assistidos.service';
import { FormsService } from 'src/app/core/services/forms.service';
import { Assistido, AssistidoFull } from 'src/app/core/types/assistido';
import { ModalAssistidoComponent } from 'src/app/shared/modal-assistido/modal-assistido.component';
import { ModalErrosComponent } from 'src/app/shared/modal-erros/modal-erros.component';
import { ModalExcluidoComponent } from 'src/app/shared/modal-excluido/modal-excluido.component';

@Component({
  selector: 'app-assistidos-edit',
  templateUrl: './assistidos-edit.component.html',
  styleUrls: ['./assistidos-edit.component.scss'],
})
export class AssistidosEditComponent {
  tituloDaPagina: string = 'Editar Assistido';
  form!: FormGroup<any> | null;
  assistido!: AssistidoFull | AssistidoCivil | AssistidoTrabalhista;
  idParam!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private assistidoService: AssistidosService,
    private formAssistidosService: FormsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.idParam = this.route.snapshot.paramMap.get('cpf') as string;

    this.assistidoService.consultar(this.idParam).subscribe((callback) => {
      this.assistido = callback;
      this.tituloDaPagina = `Editar Assistido - ${this.assistido.nome}`;
      this.carregarFormulario();
    });
  }

  carregarFormulario() {
    this.form = this.formAssistidosService.getForm();
    const assistidoType = this.assistido['@type'];

    this.form?.patchValue({
      '@type': assistidoType,
      nome: this.assistido.nome,
      email: this.assistido.email,
      cpf: this.assistido.cpf,
      rg: this.assistido.rg,
      nacionalidade: this.assistido.nacionalidade,
      estadoCivil: this.assistido.estadoCivil,
      telefone: this.assistido.telefone,
      endereco: {
        residencial: this.assistido.endereco.residencial,
        comercial: this.assistido.endereco.comercial
      },
      escolaridade: this.assistido.escolaridade,
      filiacao: this.assistido.filiacao,
      profissao: this.assistido.profissao,
      remuneracao: this.assistido.remuneracao,
    });

    if (assistidoType === 'Full') {
      const assistidoFull = this.assistido as AssistidoFull;
      this.form?.patchValue({
        dataNascimento: assistidoFull.dataNascimento,
        naturalidade: assistidoFull.naturalidade,
        dependentes: assistidoFull.dependentes,
        ctps: assistidoFull.ctps,
        pis: assistidoFull.pis,
        empregadoAtualmente: assistidoFull.empregadoAtualmente
      });
    } else if (assistidoType === 'Civil') {
      const assistidoCivil = this.assistido as AssistidoCivil;
      this.form?.patchValue({
        dataNascimento: assistidoCivil.dataNascimento,
        naturalidade: assistidoCivil.naturalidade,
        dependentes: assistidoCivil.dependentes
      });
    } else if (assistidoType === 'Trabalhista') {
      const assistidoTrabalhista = this.assistido as AssistidoTrabalhista;
      this.form?.patchValue({
        ctps: assistidoTrabalhista.ctps,
        pis: assistidoTrabalhista.pis,
        empregadoAtualmente: assistidoTrabalhista.empregadoAtualmente
      });
    }
  }


  editar() {
    let tipoSelecionado = this.form?.value['@type'];
    let dadosAtualizados: any = {
      '@type': tipoSelecionado,
      nome: this.form?.value.nome,
      email: this.form?.value.email,
      cpf: this.form?.value.cpf,
      rg: this.form?.value.rg,
      estadoCivil: this.form?.value.estadoCivil,
      telefone: this.form?.value.telefone,
      endereco: this.form?.value.endereco,
      escolaridade: this.form?.value.escolaridade,
      filiacao: this.form?.value.filiacao,
      profissao: this.form?.value.profissao,
      remuneracao: this.form?.value.remuneracao,
    };

    // Remover campos dependendo do tipo selecionado
    if (tipoSelecionado === 'Civil') {
      dadosAtualizados = {
        ...dadosAtualizados,
        dataNascimento: this.form?.value.dataNascimento,
        naturalidade: this.form?.value.naturalidade,
        dependentes: this.form?.value.dependentes,
      };
    } else if (tipoSelecionado === 'Trabalhista') {
      dadosAtualizados = {
        ...dadosAtualizados,
        ctps: this.form?.value.ctps,
        pis: this.form?.value.pis,
        empregadoAtualmente: this.form?.value.empregadoAtualmente,
      };
    } else if (tipoSelecionado === 'Full') {
      dadosAtualizados = {
        ...dadosAtualizados,
        dataNascimento: this.form?.value.dataNascimento,
        naturalidade: this.form?.value.naturalidade,
        dependentes: this.form?.value.dependentes,
        ctps: this.form?.value.ctps,
        pis: this.form?.value.pis,
        empregadoAtualmente: this.form?.value.empregadoAtualmente,
      };
    }

    this.assistidoService.editar(this.idParam, dadosAtualizados).subscribe({
      next: () => {
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

  excluir() {
    this.assistidoService.excluir(this.idParam).subscribe({
      next: () => {
        this.router.navigate(['/assistidos']);
      },
      error: () => {
        alert('Erro ao excluir Assisitido!');
      },
    });
  }

  abrirModalExcluir(assistido: Assistido) {
    this.dialog.open(ModalExcluidoComponent, {
      width: '372px',
      height: '228px',
      data: {
        tituloCriado: 'Assistido',
        nome: assistido.nome,
        deletar: () => this.excluir(),
      },
    });
  }

  abrirModal(novoAssistido: Assistido) {
    this.dialog.open(ModalAssistidoComponent, {
      width: '552px',
      height: '360px',
      data: { operacao: 'editado', nome: novoAssistido.nome, email: novoAssistido.email, cpf: novoAssistido.cpf }
    })
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
