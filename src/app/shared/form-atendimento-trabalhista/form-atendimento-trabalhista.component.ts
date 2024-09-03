import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsService } from 'src/app/core/services/forms.service';
import { tipoEnvolvido } from 'src/app/core/types/atendimento';
import { Medida } from 'src/app/core/types/medida';
import { MedidasService } from 'src/app/feature/medidas/service/medidas.service';

@Component({
  selector: 'app-form-atendimento-trabalhista',
  templateUrl: './form-atendimento-trabalhista.component.html',
  styleUrls: ['./form-atendimento-trabalhista.component.scss']
})
export class FormAtendimentoTrabalhistaComponent implements OnInit {
  formAtendimentosTrabalhista!: FormGroup;
  status: string[] = [
    'Reprovado',
    'Arquivado',
    'Aguardando documentos',
    'Pendente distribuição',
    'Processo ativo',
    'Processo arquivado',
  ];
  medidasJudiciais: Medida[] = [];
  regexMonetaria: RegExp = /^R\$ \d{1,3}(?:[.,]\d{3})*(?:,\d{1,2})?$/;

  estagiarioControl: FormControl = new FormControl<tipoEnvolvido | null>(null);
  professorControl: FormControl = new FormControl<tipoEnvolvido | null>(null);
  secretariaControl: FormControl = new FormControl<tipoEnvolvido | null>(null);
  assistidoControl: FormControl = new FormControl(null, Validators.required);
  arquivoSelecionado: File | null = null; // Variável para armazenar o nome do arquivo selecionado

  @Input() editarComponente = false;
  @Output() acaoClique: EventEmitter<void> = new EventEmitter();
  @Output() acaoCliqueExcluir: EventEmitter<void> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormsService,
    private medidasService: MedidasService
  ) { }

  ngOnInit() {
    this.formAtendimentosTrabalhista = this.formBuilder.group({
      '@type': ['Trabalhista'],
      area: [{ value: 'Trabalhista', disabled: true }, Validators.required],
      status: [null],
      id: [null],
      instante: [{ value: new Date().toISOString(), disabled: true }],
      ficha: this.formBuilder.group({
        '@type': ['Trabalhista'],
        dadosSensiveis: [false],
        assinatura: [null],
        reclamado: this.formBuilder.group({
          nome: [null, Validators.required],
          tipoPessoa: [null],
          numCadastro: [null],
          endereco: this.formBuilder.group({
            cep: [null],
            cidade: [null],
            logradouro: [null],
            bairro: [null],
            numero: [null],
            complemento: [null]
          }),
        }),
        medidaJuridica: ['Reclamação trabalhista', Validators.required],
        relacaoEmpregaticia: this.formBuilder.group({
          dataAdmissao: [null],
          dataSaida: [null],
          funcaoExercida: [null],
          valorSalarioCtps: [null, [Validators.pattern(this.regexMonetaria)]],
          salarioAnotadoCtps: [null],
          valorUltimaRemuneracao: [null, [Validators.pattern(this.regexMonetaria)]],
          ctpsAssinadaCerto: [null],
          dispensa: [null],
          jornadaTrabalho: [null],
          tempoAlmoco: [null],
          faziaHorasExtras: [null],
          horarioHorasExtras: [null],
          trabalhavaDomingosFeriados: [null],
          recebiaGratificacoes: [null],
          cumpriuAvisoPrevio: [null],
          temFeriasVencidasGozar: [null],
          recebeu13SalarioAnoAnterior: [null],
          fgtsDepositado: [null],
          recebeuGuiasSaqueFgts: [null],
          recebeuFormSeguroDesemprego: [null],
          inssRecolhido: [null],
          pagaAlgumaVerba: [null, [Validators.pattern(this.regexMonetaria)]],
          saldoSalario: [null, [Validators.pattern(this.regexMonetaria)]],
          avisoPrevioIndenizado: [null, [Validators.pattern(this.regexMonetaria)]],
          _13SalarioProporcional: [null, [Validators.pattern(this.regexMonetaria)]],
          feriasVencidas: [null, [Validators.pattern(this.regexMonetaria)]],
          feriasProporcionais: [null, [Validators.pattern(this.regexMonetaria)]],
          umTercoConstitucionalFerias: [null, [Validators.pattern(this.regexMonetaria)]],
          comissoes: [null, [Validators.pattern(this.regexMonetaria)]],
          outrasInformacoes: [null],
        }),
        testemunhas: this.formBuilder.array([this.criarGrupoTestemunha(), this.criarGrupoTestemunha()]),
        documentosDepositadosNpj: this.formBuilder.group({
          procuracao: [null],
          declaracaoPobreza: [null],
          ctps: [null],
          identidade: [null],
          cpf: [null],
          pis: [null],
          contrachequeUltimos3Meses: [null],
          extratoAnaliticoContaFgts: [null],
          trct: [null],
          comprovanteRecAntecip13: [null],
          acordoColetivoTrabalho: [null],
          outrosDocumentos: [null]
        })
      }),
      prazoEntregaDocumentos: [null],
      historico: this.formBuilder.array([this.criarGrupoHistorico()]),
      envolvidos: this.formBuilder.group({
        assistido: this.assistidoControl,
        estagiario: this.estagiarioControl,
        professor: this.professorControl,
        secretaria: this.secretariaControl
      })
    });

    // this.medidasService.listagemMedidas()
    //   .pipe(
    //     map(medidas => medidas.list.filter(medida => medida.area === "Trabalhista"))
    //   )
    //   .subscribe(filteredMedidas => {
    //     this.medidasJudiciais = filteredMedidas;
    //     this.formAtendimentosTrabalhista.get('ficha.medidaJuridica')?.setValue('');
    //     this.formAtendimentosTrabalhista.get('ficha.medidaJuridica')?.updateValueAndValidity();
    //   });

    this.formService.setForm(this.formAtendimentosTrabalhista);
  }

  executarAcao() {
    this.acaoClique.emit();
  }

  executarAcaoExcluir() {
    this.acaoCliqueExcluir.emit();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.arquivoSelecionado = inputElement.files[0];
    } else {
      this.arquivoSelecionado = null;
    }
  }

  removerArquivoSelecionado(): void {
    this.arquivoSelecionado = null;
    this.formAtendimentosTrabalhista.get('ficha.assinatura')?.setValue(null);
  }

  adicionarHistorico(): void {
    (this.formAtendimentosTrabalhista.get('historico') as FormArray).push(this.criarGrupoHistorico());
  }

  private criarGrupoHistorico(): FormGroup {
    return this.formBuilder.group({
      titulo: [null],
      descricao: [null],
      instante: [new Date()], // não necessario, o back irá retornar
      criadoPor: this.formBuilder.group({
        nome: [null]
      })
    });
  }

  adicionarTestemunha(): void {
    (this.formAtendimentosTrabalhista.get('ficha')?.get('testemunhas') as FormArray).push(this.criarGrupoTestemunha());
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

  get historico(): FormArray {
    return this.formAtendimentosTrabalhista.get('historico') as FormArray;
  }

  get testemunhas(): FormArray {
    return this.formAtendimentosTrabalhista.get('ficha.testemunhas') as FormArray;
  }

  abrirNovaGuia() {
    window.open('/assistidos/add', '_blank');
  }
}
