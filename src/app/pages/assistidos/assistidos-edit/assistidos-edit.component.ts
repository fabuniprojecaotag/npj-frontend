import { AssistidoCivil, AssistidoTrabalhista } from './../../../core/types/assistido';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AssistidosService } from 'src/app/core/services/assistidos.service';
import { FormsService } from 'src/app/core/services/forms.service';
import { Assistido, AssistidoFull } from 'src/app/core/types/assistido';
import { ModalExcluidoComponent } from 'src/app/shared/modal-excluido/modal-excluido.component';

@Component({
  selector: 'app-assistidos-edit',
  templateUrl: './assistidos-edit.component.html',
  styleUrls: ['./assistidos-edit.component.scss'],
})
export class AssistidosEditComponent {
  tituloDaPagina: string = 'Editar Assistido';
  form!: FormGroup<any> | null;
  assistido!: AssistidoFull;
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
    this.form?.patchValue({
      '@type': this.assistido['@type'],
      nome: this.assistido.nome,
      email: this.assistido.email,
      cpf: this.assistido.cpf,
      rg: this.assistido.rg,
      naturalidade: this.assistido.naturalidade,
      nacionalidade: this.assistido.nacionalidade,
      dataNascimento: this.assistido.dataNascimento,
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
      dependentes: this.assistido.dependentes,
    });
  }

  editar() {
    let dadosAtualizados: AssistidoTrabalhista | AssistidoCivil | AssistidoFull;

    if (this.assistido['@type'] === 'Trabalhista') {
      dadosAtualizados = {
        ...this.form?.value,
        ['@type']: this.form?.value['@type'] as 'AssistidoTrabalhista'
      } as AssistidoTrabalhista;
    } else if (this.assistido['@type'] === 'Civil') {
      dadosAtualizados = {
        ...this.form?.value,
        ['@type']: this.form?.value['@type'] as 'AssistidoCivil'
      } as AssistidoCivil;
    } else {
      dadosAtualizados = {
        ...this.form?.value,
        ['@type']: this.form?.value['@type'] as 'AssistidoFull'
      } as AssistidoFull;
    }

    this.assistidoService.editar(this.idParam, dadosAtualizados).subscribe({
      next: () => {
        this.router.navigate(['/assistidos']);
      },
      error: () => {
        alert('Erro ao atualizar Assisitido!');
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

  abrirModal(assistido: Assistido) {
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
}
