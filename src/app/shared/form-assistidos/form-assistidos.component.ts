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
  tipoAssistido = [
    { valor: 'Civil', texto: 'Civil' },
    { valor: 'Trabalhista', texto: 'Trabalhista' },
    { valor: 'Full', texto: 'Ambos' },
  ];
  estadosCivis = [
    { texto: 'Solteiro', valor: 'SOLTEIRO' },
    { texto: 'Solteira', valor: 'SOLTEIRA' },
    { texto: 'Casado', valor: 'CASADO' },
    { texto: 'Casada', valor: 'CASADA' },
    { texto: 'Separado', valor: 'SEPARADA' },
    { texto: 'Separada', valor: 'SEPARADO' },
    { texto: 'Divorciado', valor: 'DIVORCIADO' },
    { texto: 'Divorciada', valor: 'DIVORCIADA' },
    { texto: 'Viúvo', valor: 'VIUVO' },
    { texto: 'Viúva', valor: 'VIUVA' },
  ];
  escolaridades = [
    { texto: 'Fundamental', valor: 'FUNDAMENTAL' },
    { texto: 'Médio', valor: 'MEDIO' },
    { texto: 'Superior', valor: 'SUPERIOR' },
    { texto: 'Pós Graduação', valor: 'POS_GRADUACAO' },
    { texto: 'Mestrado', valor: 'MESTRADO' },
    { texto: 'Doutorado', valor: 'DOUTORADO' },
  ]
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
      "@type": [null, Validators.required],
      nome: [null, Validators.required],
      email: [null, Validators.email],
      cpf: [null, [Validators.minLength(11)]],
      rg: [null, [Validators.required, Validators.minLength(8)]],
      naturalidade: null,
      nacionalidade: null,
      dataNascimento: null,
      estadoCivil: null,
      telefone: [null, Validators.minLength(8)],
      endereco: this.formBuilder.group({
        bairro: [null],
        complemento: [null],
        cidade: [null],
        cep: [null, Validators.minLength(8)],
        logradouro: [null],
        numero: [null]
      }),
      escolaridade: [null],
      filiacao: this.formBuilder.group({
        pai: [null, Validators.required],
        mae: [null, Validators.required],
      }),
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
    let cep = this.formAssistidos.get('endereco')?.get('cep')?.value;
    cep = cep?.replace(/[.-]/g, '');

    if (cep) {
      this.viaCepService.consultarCep(cep).subscribe({
        next: (data) => {
          this.formAssistidos.get('endereco')?.patchValue({
            bairro: data.bairro,
            cidade: data.localidade,
            logradouro: data.logradouro,
            complemento: data.complemento,
          });
        },
        error: (err) => {
          console.error('Erro ao consultar CEP:', err);
        }
      });
    }
  }

}
