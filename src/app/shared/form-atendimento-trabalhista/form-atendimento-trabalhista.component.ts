import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormsService } from 'src/app/core/services/forms.service';

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

  estagiarioControl: FormControl = new FormControl();
  professorControl: FormControl = new FormControl();
  secretariaControl: FormControl = new FormControl();
  assistidoControl: FormControl = new FormControl(null, Validators.required);
  arquivoSelecionado: File | null = null; // Variável para armazenar o nome do arquivo selecionado

  @Input() editarComponente: boolean = false;
  @Output() fileSelected: EventEmitter<File> = new EventEmitter<File>();
  @Output() acaoClique: EventEmitter<any> = new EventEmitter();
  @Output() acaoCliqueExcluir: EventEmitter<any> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: CadastroService,
    private formService: FormsService
  ) { }

  ngOnInit() {
    this.usuarioService.buscarMeuUsuario().subscribe({
      next: (usuario) => {
        if (usuario.role.toLowerCase() === 'estagiario' && this.editarComponente === false) {
          this.estagiarioControl.setValue(usuario);
        }
      },
      error: () => {
        alert('Usuário não encontrado!');
      },
    });

    this.formAtendimentosTrabalhista = this.formBuilder.group({
      '@type': ['Trabalhista'],
      status: [null],
      area: ['Trabalhista'],
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
        medidaJuridica: [null, Validators.required],
        relacaoEmpregaticia: this.formBuilder.group({
          dataAdmissao: [null],
          dataSaida: [null],
          funcaoExercida: [null],
          valorSalarioCtps: [null],
          salarioAnotadoCtps: [null],
          valorUltimaRemuneracao: [null],
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
          pagaAlgumaVerba: [null],
          saldoSalario: [null],
          avisoPrevioIndenizado: [null],
          _13SalarioProporcional: [null],
          feriasVencidas: [null],
          feriasProporcionais: [null],
          umTercoConstitucionalFerias: [null],
          comissoes: [null],
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
      historico: this.formBuilder.array([this.criarGrupoHistorico()]),
      envolvidos: this.formBuilder.group({
        assistido: this.assistidoControl,
        estagiario: this.estagiarioControl,
        professor: this.professorControl,
        secretaria: this.secretariaControl
      })
    });

    this.formService.setForm(this.formAtendimentosTrabalhista);
  }

  executarAcao() {
    this.acaoClique.emit();
  }

  executarAcaoExcluir() {
    this.acaoCliqueExcluir.emit();
  }

  onFileSelected(event: any): void {
    this.formAtendimentosTrabalhista.get('ficha.assinatura')?.setValue(event.target.files[0]);
    this.arquivoSelecionado = this.formAtendimentosTrabalhista.get('ficha.assinatura')?.value;
  }

  removerArquivoSelecionado(): void {
    this.arquivoSelecionado = null;
    this.formAtendimentosTrabalhista.get('ficha.assinatura')?.setValue(null);
  }

  adicionarHistorico(): void {
    (this.formAtendimentosTrabalhista.get('historico') as FormArray).push(this.criarGrupoHistorico());
  }

  criarGrupoHistorico(): FormGroup {
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

  criarGrupoTestemunha(): FormGroup {
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
}
