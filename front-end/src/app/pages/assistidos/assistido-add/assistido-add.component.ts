import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-assistido-add',
  templateUrl: './assistido-add.component.html',
  styleUrls: ['./assistido-add.component.scss']
})
export class AssistidoAddComponent {
  tituloDaPagina: string = 'Novo Assistido';
  form!: FormGroup;

  constructor(private fb: FormBuilder){ }

  ngOnInit(){
    this.form = this.fb.group({
      nome: null,
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
      nomePai: null,
      nomeMae: null,
      profissao: null,
      remuneracao: null,
      cidadeComercial: null,
      enderecoComercial: null,
      numDependentes: null,
    });
  }

  onSubmit(){
    alert("Submit button pressed.");
  }
}
