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
  ) {}

  ngOnInit(): void {
    this.idParam = this.route.snapshot.paramMap.get('cpf') as string;

    this.assistidoService.consultar(this.idParam).subscribe((callback) => {
      this.assistido = callback;
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
      endereco: this.assistido.endereco,
      escolaridade: this.assistido.escolaridade,
      filiacao: this.assistido.filiacao,
      profissao: this.assistido.profissao,
      remuneracao: this.assistido.remuneracao,
      dependentes: this.assistido.dependentes,
    });
  }

  editar() {
    const dadosAtualizados: AssistidoFull = {
      ['@type']: this.form?.value.type,
      nome: this.form?.value.nome,
      email: this.form?.value.email,
      // cpf: this.form?.value.cpf, // não enviar CPF, pois ocorrera conflito entre documentId e CPF
      rg: this.form?.value.rg,
      naturalidade: this.form?.value.naturalidade,
      nacionalidade: this.form?.value.nacionalidade,
      dataNascimento: this.form?.value.dataNascimento,
      estadoCivil: this.form?.value.estadoCivil,
      telefone: this.form?.value.telefone,
      endereco: {
        residencial: {
          logradouro: this.form?.value.logradouro,
          bairro: this.form?.value.bairro,
          numero: this.form?.value.numero,
          complemento: this.form?.value.complemento,
          cep: this.form?.value.cep,
          cidade: this.form?.value.cidade,
        },
        comercial: {
          logradouro: this.form?.value.logradouro,
          bairro: this.form?.value.bairro,
          numero: this.form?.value.numero,
          complemento: this.form?.value.complemento,
          cep: this.form?.value.cep,
          cidade: this.form?.value.cidade,
        },
      },
      escolaridade: this.form?.value.escolaridade,
      filiacao: {
        pai: this.form?.value.pai,
        mae: this.form?.value.mae,
      },
      profissao: this.form?.value.profissao,
      remuneracao: this.form?.value.remuneracao,
      dependentes: this.form?.value.dependentes,
      ctps: {
        numero: undefined,
        serie: undefined,
        uf: undefined,
      },
      pis: '',
      empregadoAtualmente: false,
    };

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
