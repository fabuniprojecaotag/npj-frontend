import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormAssistidosService } from 'src/app/core/services/form-assistidos.service';

@Component({
  selector: 'app-form-assistidos',
  templateUrl: './form-assistidos.component.html',
  styleUrls: ['./form-assistidos.component.scss']
})
export class FormAssistidosComponent implements OnInit {
  formAssistidos!: FormGroup;
  @Output() acaoClique: EventEmitter<any> = new EventEmitter<any>();
  @Output() cliqueExcluir: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, private formAssistidosService: FormAssistidosService) { }

  ngOnInit(): void {
    this.formAssistidos = this.formBuilder.group({
      nome: [null, Validators.required],
      email: null,
      cpf: null,
      rg: null,
      naturalidade: null,
      nacionalidade: null,
      dataNascimento: null,
      estadoCivil: null,
      telefone: null,
      cidade: null,
      cep: null,
      enderecoResidencial: null,
      escolaridade: null,
      nomePai: [null, Validators.required],
      nomeMae: [null, Validators.required],
      profissao: null,
      remuneracao: null,
      cidadeComercial: null,
      enderecoComercial: null,
      numDependentes: null,
    });

    this.formAssistidosService.setCadastro(this.formAssistidos);
  }

  // cadastro ou edição de assistidos
  executarAcao () {
    this.acaoClique.emit();
  }

  excluir () {
    this.cliqueExcluir.emit();
  }
}
