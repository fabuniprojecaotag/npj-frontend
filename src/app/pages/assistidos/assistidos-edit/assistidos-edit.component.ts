import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AssistidosService } from 'src/app/core/services/assistidos.service';
import { FormAssistidosService } from 'src/app/core/services/form-assistidos.service';
import { Assistido } from 'src/app/core/types/assistido';
import { ModalExcluidoComponent } from 'src/app/shared/modal-excluido/modal-excluido.component';

@Component({
  selector: 'app-assistidos-edit',
  templateUrl: './assistidos-edit.component.html',
  styleUrls: ['./assistidos-edit.component.scss']
})
export class AssistidosEditComponent {
  tituloDaPagina: string = 'Editar Assistido';
  form!: FormGroup<any> | null;
  assistido!: Assistido;
  idParam!: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private assistidoService: AssistidosService,
    private formAssistidosService: FormAssistidosService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.idParam = this.route.snapshot.paramMap.get('cpf') as string;

    this.assistidoService.consultar(this.idParam).subscribe(callback => {
      this.assistido = callback;
      console.log("assistido para editar:", this.assistido)
      this.carregarFormulario();
    })
  }

  carregarFormulario() {
    this.form = this.formAssistidosService.getCadastro();
    this.form?.patchValue({
      documentId: this.assistido.documentId,
      nome: this.assistido.nome,
      email: this.assistido.email,
      cpf: this.assistido.cpf,
      rg: this.assistido.rg,
      naturalidade: this.assistido.naturalidade,
      nacionalidade: this.assistido.nacionalidade,
      dataNascimento: this.assistido.dataNascimento,
      estadoCivil: this.assistido.estadoCivil,
      telefone: this.assistido.telefone,
      cidade: this.assistido.cidade,
      cep: this.assistido.cep,
      enderecoResidencial: this.assistido.enderecoResidencial,
      escolaridade: this.assistido.escolaridade,
      nomePai: this.assistido.nomePai,
      nomeMae: this.assistido.nomeMae,
      profissao: this.assistido.profissao,
      remuneracao: this.assistido.remuneracao,
      cidadeComercial: this.assistido.cidadeComercial,
      enderecoComercial: this.assistido.enderecoComercial,
      numDependentes: this.assistido.numDependentes,
    });

  }

  editar() {
    const dadosAtualizados = {
      nome: this.form?.value.nome,
      email: this.form?.value.email,
      cpf: this.form?.value.cpf,
      rg: this.form?.value.rg,
      naturalidade: this.form?.value.naturalidade,
      nacionalidade: this.form?.value.nacionalidade,
      dataNascimento: this.form?.value.dataNascimento,
      estadoCivil: this.form?.value.estadoCivil,
      telefone: this.form?.value.telefone,
      cidade: this.form?.value.cidade,
      cep: this.form?.value.cep,
      enderecoResidencial: this.form?.value.enderecoResidencial,
      escolaridade: this.form?.value.escolaridade,
      nomePai: this.form?.value.nomePai,
      nomeMae: this.form?.value.nomeMae,
      profissao: this.form?.value.profissao,
      remuneracao: this.form?.value.remuneracao,
      cidadeComercial: this.form?.value.cidadeComercial,
      enderecoComercial: this.form?.value.enderecoComercial,
      numDependentes: this.form?.value.numDependentes,
      senha: this.form?.value.senha,
    }

    this.assistidoService.editar(this.idParam,dadosAtualizados).subscribe({
      next: (response) => {
        alert('Atualização feita com sucesso!');
        this.router.navigate(['/assistidos']);
      },
      error: (err) => {
        console.log('erro ao atualizar:', err);
      }
    })
  }

  excluir() {
    console.log('Função excluir chamada...');
    this.assistidoService.excluir(this.idParam).subscribe({
      next: (response) => {
        alert("Usuário excluído com sucesso");
        this.router.navigate(['/assistidos']);
      },
      error: (err) => {
        console.log("Erro ao excluir:", err);
      }
    });
  }

  abrirModal(assistido: Assistido) {
    this.dialog.open(ModalExcluidoComponent, {
      width: '372px',
      height: '228px',
      data: { tituloCriado: 'Assistido', nome: assistido.nome, funcaoDeletar: this.excluir.bind(this) }
    });
  }

}
