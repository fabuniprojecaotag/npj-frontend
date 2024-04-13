import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsService } from 'src/app/core/services/forms.service';
import { ViacepService } from 'src/app/core/services/viacep.service';

@Component({
  selector: 'app-form-assistidos',
  templateUrl: './form-assistidos.component.html',
  styleUrls: ['./form-assistidos.component.scss']
})
export class FormAssistidosComponent implements OnInit {
  formAssistidos!: FormGroup;
  @Input() editComponent: boolean = false;
  @Output() acaoClique: EventEmitter<any> = new EventEmitter<any>();
  @Output() cliqueExcluir: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private formAssistidosService: FormsService,
    private viaCepService: ViacepService
  ) { }

  ngOnInit(): void {
    this.formAssistidos = this.formBuilder.group({
      "@type": ["AssistidoCivilDTO"],
      nome: [null, Validators.required],
      email: [null, Validators.email],
      cpf: [null, [Validators.minLength(11)]],
      rg: [null, [Validators.required, Validators.minLength(8)]],
      naturalidade: null,
      nacionalidade: null,
      dataNascimento: null,
      estadoCivil: null,
      telefone: null,
      cidade: null,
      cep: [null, Validators.minLength(8)],
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

    this.formAssistidosService.setForm(this.formAssistidos);
  }

  // cadastro ou edição de assistidos
  executarAcao() {
    this.acaoClique.emit();
  }

  excluir() {
    this.cliqueExcluir.emit();
  }

  consultarCep(): void {
    let cep = this.formAssistidos.get('cep')?.value;
    cep = cep.replace(/[.-]/g, '');

    if (cep) {
      this.viaCepService.consultarCep(cep).subscribe({
        next: (data) => {
          this.formAssistidos.patchValue({
            cidade: data.localidade,
            enderecoResidencial: data.logradouro
          });
        },
        error: (err) => {
          console.error('Erro ao consultar CEP:', err);
        }
      });
    }
  }
}
