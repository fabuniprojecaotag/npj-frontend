import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AssistidosService } from 'src/app/feature/assistidos/services/assistidos.service';
import { FormsService } from 'src/app/core/services/forms.service';
import { Assistido } from 'src/app/core/types/assistido';
import { ModalAssistidoComponent } from 'src/app/shared/modal-assistido/modal-assistido.component';

@Component({
  selector: 'app-assistido-add',
  templateUrl: './assistido-add.component.html',
  styleUrls: ['./assistido-add.component.scss'],
})
export class AssistidoAddComponent {
  tituloDaPagina = 'Novo Assistido';
  form!: FormGroup<any> | null;

  constructor(
    private formAssistidosService: FormsService,
    private assistidoService: AssistidosService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  cadastrar(): void {
    this.form = this.formAssistidosService.getForm();

    let novoAssistido: any = {
      '@type': this.form?.value['@type'],
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
      nacionalidade: this.form?.value.nacionalidade
    };

    // Remover campos dependendo do tipo selecionado
    if (this.form?.value['@type'] === 'Civil') {
      novoAssistido = {
        ...novoAssistido,
        dataNascimento: this.form?.value.dataNascimento,
        naturalidade: this.form?.value.naturalidade,
        dependentes: this.form?.value.dependentes,
      };
    } else if (this.form?.value['@type'] === 'Trabalhista') {
      novoAssistido = {
        ...novoAssistido,
        ctps: this.form?.value.ctps,
        pis: this.form?.value.pis,
        empregadoAtualmente: this.form?.value.empregadoAtualmente,
      };
    } else if (this.form?.value['@type'] === 'Full') {
      novoAssistido = {
        ...novoAssistido,
        dataNascimento: this.form?.value.dataNascimento,
        naturalidade: this.form?.value.naturalidade,
        dependentes: this.form?.value.dependentes,
        ctps: this.form?.value.ctps,
        pis: this.form?.value.pis,
        empregadoAtualmente: this.form?.value.empregadoAtualmente,
      };
    }

    if (this.form?.valid) {
      this.assistidoService.cadastrarAssistido(novoAssistido).subscribe({
        next: (value) => {
          this.abrirModal(value);
          this.router.navigate(['assistidos/list']);
        },
        error: (err) => { },
      });
    }
  }

  abrirModal(novoAssistido: Assistido) {
    this.dialog.open(ModalAssistidoComponent, {
      width: '552px',
      height: '360px',
      data: { operacao: 'criado', nome: novoAssistido.nome, email: novoAssistido.email, cpf: novoAssistido.cpf }
    });
  }
}
