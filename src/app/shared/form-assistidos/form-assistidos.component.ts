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
    'Solteiro',
    'Solteira',
    'Casado',
    'Casada',
    'Separado',
    'Separada',
    'Divorciado',
    'Divorciada',
    'Viúvo',
    'Viúva',
  ];
  escolaridades = [
    'Fundamental',
    'Médio',
    'Superior',
    'Pós Graduação',
    'Mestrado',
    'Doutorado',
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
      enderecos: this.formBuilder.group({
        enderecoResidencial: this.formBuilder.group({
          cep: [null, Validators.minLength(8)],
          bairro: [null],
          complemento: [null],
          cidade: [null],
          logradouro: [null],
          numero: [null]
        }),
        enderecoComercial: this.formBuilder.group({
          cep: [null, Validators.minLength(8)],
          bairro: [null],
          complemento: [null],
          cidade: [null],
          logradouro: [null],
          numero: [null]
        }),
      }),
      escolaridade: [null],
      filiacao: this.formBuilder.group({
        pai: [null, Validators.required],
        mae: [null, Validators.required],
      }),
      profissao: null,
      remuneracao: null,
      dependentes: null,
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

  consultarCep(tipoEndereco: string): void {
    let enderecoGroup = this.formAssistidos.get('enderecos')?.get(`endereco${tipoEndereco}`);
    let cep = enderecoGroup?.get('cep')?.value;
    cep = cep?.replace(/[.-]/g, '');

    if (cep) {
      this.viaCepService.consultarCep(cep).subscribe({
        next: (data) => {
          enderecoGroup?.patchValue({
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
