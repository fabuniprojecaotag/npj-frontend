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
  ];
  formAssistidos!: FormGroup;
  @Input() editComponent = false;
  @Output() acaoClique: EventEmitter<void> = new EventEmitter<void>();
  @Output() cliqueExcluir: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private formAssistidosService: FormsService,
    private viaCepService: ViacepService
  ) { }

  ngOnInit(): void {
    this.formAssistidos = this.formBuilder.group({
      "@type": [null, Validators.required],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      email: [null, Validators.email],
      cpf: [{ value: null, disabled: this.editComponent }, [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      rg: [null, [Validators.required, Validators.pattern(/^\d{1,2}\.\d{3}\.\d{3}$/)]],
      naturalidade: [null],
      estadoCivil: [null],
      profissao: [null],
      remuneracao: [null, [Validators.pattern(/^R\$ \d{1,3}(?:[.,]\d{3})*(?:,\d{1,2})?$/)]],
      telefone: [null, [Validators.minLength(11), Validators.pattern(/^\(\d{2}\)\s\d{5}-\d{4}$/), Validators.required]],
      escolaridade: [null],
      filiacao: this.formBuilder.group({
        pai: [null, Validators.required],
        mae: [null, Validators.required],
      }),
      endereco: this.formBuilder.group({
        residencial: this.formBuilder.group({
          cep: [null, [Validators.minLength(8), Validators.required]],
          bairro: [null, Validators.required],
          complemento: [null],
          cidade: [null, Validators.required],
          logradouro: [null, Validators.required],
          numero: [null]
        }),
        comercial: this.formBuilder.group({
          cep: [null, Validators.minLength(8)],
          bairro: [null],
          complemento: [null],
          cidade: [null],
          logradouro: [null],
          numero: [null]
        }),
      }),
      /* campos de assistido cívil */
      nacionalidade: [null],
      dataNascimento: [null],
      dependentes: [null],
      /* campos de assistido trabalhista */
      ctps: this.formBuilder.group({
        numero: [null],
        serie: [null],
        uf: [null],
      }),
      pis: [null],
      empregadoAtualmente: [false],
    });

    this.formAssistidos.get('@type')?.valueChanges.subscribe(tipo => {
      const dataNascimentoControler = this.formAssistidos.get('dataNascimento');
      const naturalidade = this.formAssistidos.get('naturalidade');
      const dependentes = this.formAssistidos.get('dependentes');
      const pis = this.formAssistidos.get('pis');
      const ctpsNumero = this.formAssistidos.get('ctps')?.get('numero');
      const ctpsSerie = this.formAssistidos.get('ctps')?.get('serie');
      const ctpsUF = this.formAssistidos.get('ctps')?.get('uf');

      if (tipo === 'Civil') {
        dataNascimentoControler?.setValidators(Validators.required);
        naturalidade?.setValidators(Validators.required);
        dependentes?.setValidators(Validators.required);
        pis?.clearValidators();
        ctpsNumero?.clearValidators();
        ctpsSerie?.clearValidators();
        ctpsUF?.clearValidators();
      } else if (tipo === 'Trabalhista') {
        pis?.setValidators(Validators.required);
        ctpsNumero?.setValidators(Validators.required);
        ctpsSerie?.setValidators(Validators.required);
        ctpsUF?.setValidators(Validators.required);
        dataNascimentoControler?.clearValidators();
        naturalidade?.clearValidators();
        dependentes?.clearValidators();
      } else if (tipo === 'Ambos') {
        dataNascimentoControler?.setValidators(Validators.required);
        naturalidade?.setValidators(Validators.required);
        dependentes?.setValidators(Validators.required);
        ctpsNumero?.setValidators(Validators.required);
        ctpsSerie?.setValidators(Validators.required);
        ctpsUF?.setValidators(Validators.required);
        pis?.setValidators(Validators.required);
      }

      dataNascimentoControler?.updateValueAndValidity();
      naturalidade?.updateValueAndValidity();
      dependentes?.updateValueAndValidity();
      ctpsNumero?.updateValueAndValidity();
      ctpsSerie?.updateValueAndValidity();
      ctpsUF?.updateValueAndValidity();
      pis?.updateValueAndValidity();
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
    let enderecoGroup = this.formAssistidos.get('endereco')?.get(`${tipoEndereco}`);
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
        error: (err) => { }
      });
    }
  }
}
