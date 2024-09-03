import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsService } from 'src/app/core/services/forms.service';
import { Medida } from 'src/app/core/types/medida';
import { MedidasService } from 'src/app/feature/medidas/service/medidas.service';
import { tipoEnvolvido } from './../../core/types/atendimento';

@Component({
  selector: 'app-form-atendimento-civil',
  templateUrl: './form-atendimento-civil.component.html',
  styleUrls: ['./form-atendimento-civil.component.scss'],
})
export class FormAtendimentoCivilComponent implements OnInit {
  formAtendimentos!: FormGroup;
  status: string[] = [
    'Reprovado',
    'Arquivado',
    'Aguardando documentos',
    'Pendente distribuição',
    'Processo ativo',
    'Processo arquivado',
  ];
  areas: string[] = [
    'Civil',
    'Família',
    'Penal'
  ];
  medidasJudiciais!: Medida[];
  estagiarioControl: FormControl = new FormControl<tipoEnvolvido | null>(null);
  professorControl: FormControl = new FormControl<tipoEnvolvido | null>(null);
  secretariaControl: FormControl = new FormControl<tipoEnvolvido | null>(null);
  assistidoControl: FormControl = new FormControl(null, Validators.required);
  arquivoSelecionado: File | null = null;

  @Input() editarComponente = false;
  @Output() acaoClique: EventEmitter<void> = new EventEmitter();
  @Output() acaoCliqueExcluir: EventEmitter<void> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormsService,
    private medidasService: MedidasService
  ) { }

  ngOnInit(): void {
    this.formAtendimentos = this.formBuilder.group({
      '@type': ['Civil'],
      id: [null],
      area: [null, Validators.required],
      status: ['Aguardando documentos', Validators.required],
      instante: [{ value: new Date().toISOString(), disabled: this.editarComponente }],
      ficha: this.formBuilder.group({
        '@type': ['Civil'],
        assinatura: [null],
        dadosSensiveis: [false],
        testemunhas: this.formBuilder.array([this.criarGrupoTestemunha(), this.criarGrupoTestemunha()]),
        parteContraria: this.formBuilder.group({
          nome: [null, Validators.required],
          qualificacao: [null, Validators.required],
          rg: [null, Validators.pattern(/^\d{1,2}\.\d{3}\.\d{3}$/)],
          cpf: [null, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),],
          telefone: [null, [Validators.minLength(11)]],
          email: [null, Validators.email],
          endereco: this.formBuilder.group({
            cep: [null],
            cidade: [null],
            logradouro: [null],
            bairro: [null],
            numero: [null],
            complemento: [null],
          }),
          informacoesComplementares: [null]
        }),
        medidaJuridica: [null, Validators.required]
      }),
      prazoEntregaDocumentos: [null],
      historico: this.formBuilder.array([this.criarGrupoHistorico()]),
      envolvidos: this.formBuilder.group({
        estagiario: this.estagiarioControl,
        professor: this.professorControl,
        secretaria: this.secretariaControl,
        assistido: this.assistidoControl,
      })
    });

    // this.formAtendimentos.get('area')?.valueChanges
    // .pipe(
    //   map(area => {
    //     this.medidasService.listagemMedidas()
    //       .pipe(
    //         map(medidas => medidas.filter(medida => medida.area === area))
    //       )
    //       .subscribe(filteredMedidas => {
    //         this.medidasJudiciais = filteredMedidas;
    //         this.formAtendimentos.get('ficha.medidaJuridica')?.setValue('');
    //         this.formAtendimentos.get('ficha.medidaJuridica')?.updateValueAndValidity();
    //       });
    //   })
    // )
    // .subscribe();

    this.formService.setForm(this.formAtendimentos);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFileSelected(event: any): void {
    this.formAtendimentos.get('ficha.assinatura')?.setValue(event.target.files[0]);
    this.arquivoSelecionado = this.formAtendimentos.get('ficha.assinatura')?.value;
  }

  removerArquivoSelecionado(): void {
    this.arquivoSelecionado = null;
    this.formAtendimentos.get('ficha.assinatura')?.setValue(null);
  }

  /* funções para arrays */
  adicionarTestemunha(): void {
    (this.formAtendimentos.get('ficha')?.get('testemunhas') as FormArray).push(this.criarGrupoTestemunha());
  }

  private criarGrupoTestemunha(): FormGroup {
    return this.formBuilder.group({
      nome: [null],
      qualificacao: [null],
      endereco: this.formBuilder.group({
        cep: [null],
        cidade: [null],
        logradouro: [null],
        bairro: [null],
        numero: [null],
        complemento: [null]
      })
    });
  }

  adicionarHistorico(): void {
    (this.formAtendimentos.get('historico') as FormArray).push(this.criarGrupoHistorico());
  }

  private criarGrupoHistorico(): FormGroup {
    return this.formBuilder.group({
      titulo: [null],
      descricao: [null],
      instante: [new Date()], // não necessario, o back irá retornar
      criadoPor: this.formBuilder.group({
        id: [null],
        nome: [null],
      })
    });
  }

  get testemunhas(): FormArray {
    return this.formAtendimentos.get('ficha')?.get('testemunhas') as FormArray;
  }

  get historico(): FormArray {
    return this.formAtendimentos.get('historico') as FormArray;
  }

  executarAcao() {
    this.acaoClique.emit();
  }

  executarAcaoExcluir() {
    this.acaoCliqueExcluir.emit();
  }

  abrirPaginaAdicionar() {
    window.open('/assistidos/add', '_blank');
  }
}
