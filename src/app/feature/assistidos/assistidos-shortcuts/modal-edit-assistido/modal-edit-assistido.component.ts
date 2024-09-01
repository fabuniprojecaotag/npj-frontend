import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormsService } from 'src/app/core/services/forms.service';
import { Assistido, AssistidoCivil, AssistidoFull, AssistidoTrabalhista } from 'src/app/core/types/assistido';
import { ModalAssistidoComponent } from 'src/app/shared/modal-assistido/modal-assistido.component';
import { ModalAtalhosComponent } from 'src/app/shared/modal-atalhos/modal-atalhos.component';
import { ModalExcluidoComponent } from 'src/app/shared/modal-excluido/modal-excluido.component';
import { AssistidosService } from '../../services/assistidos.service';
import { Payload } from 'src/app/core/types/payload';

@Component({
  selector: 'app-modal-edit-assistido',
  templateUrl: './modal-edit-assistido.component.html',
  styleUrls: ['./modal-edit-assistido.component.scss']
})
export class ModalEditAssistidoComponent implements OnInit, AfterViewInit {
  assistido!: AssistidoFull | AssistidoCivil | AssistidoTrabalhista;
  form!: FormGroup | null;
  id!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formService: FormsService,
    public dialogRef: MatDialogRef<ModalAtalhosComponent>,
    private assistidoService: AssistidosService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.assistido = this.data.assistido;
    this.id = this.data.assistido.cpf;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.carregarFormulario();
    });
  }

  carregarFormulario() {
    this.form = this.formService.getForm();
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
    const tipoSelecionado = this.form?.value['@type'];

    let dadosAtualizados: any = {
      '@type': tipoSelecionado,
      nome: this.form?.value.nome,
      email: this.form?.value.email,
      // cpf: this.form?.value.cpf, - não enviar para o back na edição!
      rg: this.form?.value.rg,
      estadoCivil: this.form?.value.estadoCivil,
      telefone: this.form?.value.telefone,
      endereco: this.form?.value.endereco,
      escolaridade: this.form?.value.escolaridade,
      filiacao: this.form?.value.filiacao,
      profissao: this.form?.value.profissao,
      remuneracao: this.form?.value.remuneracao,
      nacionalidade: this.form?.value.nacionalidade
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

    const payload: Payload = {
      body: dadosAtualizados,
      classType: dadosAtualizados.area
    };

    this.assistidoService.editarAssistido(this.id, payload).subscribe({
      next: () => {
        this.dialog.closeAll();
        this.atualizarPagina();
      },
      error: (err) => { },
    });
  }

  excluir() {
    this.assistidoService.excluirAssistido(this.id).subscribe({
      next: () => {
        this.dialog.closeAll();
        this.router.navigate(['/assistidos/list']);
      },
      error: (err) => { },
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
    });
  }

  fechar() {
    this.dialogRef.close();
  }

  atualizarPagina() {
    window.location.reload();
  }
}
