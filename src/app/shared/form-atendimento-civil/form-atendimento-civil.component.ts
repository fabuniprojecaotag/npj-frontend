import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CadastroService } from 'src/app/autenticacao/services/cadastro.service';
import { FormsService } from 'src/app/core/services/forms.service';

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
  medidasFamilia: string[] = [
    'Ação de Alimentos',
    'Ação de Cumprimento de sentença de alimentos - prisão',
    'Ação de Cumprimento de sentença de alimentos - penhora',
    'Ação de Guarda',
    'Ação de Regulamentação de visitas',
    'Ação de divórcio',
    'Ação de reconhecimento e dissolução de união estável',
    'Ação de reconhecimento e dissolução de união estável post mortem',
    'Ação de interdição',
    'Ação de inventário',
    'Alvará Judicial',
    'Outro'
  ];
  medidasCivil: string[] = [
    'Ação de reparação por danos materiais',
    'Ação de reparação por danos morais',
    'Ação de reparação por danos materiais com morais',
    'Obrigação de fazer',
    'Consignação de Pagamento',
    'Ação de cobrança'
  ];
  medidasJudiciais: string[] = this.medidasCivil;
  estagiarioControl: FormControl = new FormControl(null);
  professorControl: FormControl = new FormControl();
  secretariaControl: FormControl = new FormControl();
  assistidoControl: FormControl = new FormControl(null, Validators.required);
  arquivoSelecionado: File | null = null;

  @Input() editarComponente = false;
  @Output() fileSelected: EventEmitter<File> = new EventEmitter<File>();
  @Output() acaoClique: EventEmitter<void> = new EventEmitter();
  @Output() acaoCliqueExcluir: EventEmitter<void> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormsService,
    private usuarioService: CadastroService
  ) { }

  ngOnInit(): void {
    this.usuarioService.buscarMeuUsuario().subscribe({
      next: (usuario) => {
        if (usuario.role.toLowerCase() === 'estagiario' && this.editarComponente === false) {
          this.estagiarioControl.setValue(usuario);
          this.formAtendimentos.get('status')?.disable();
        }
      },
      error: () => {
        alert('Usuário não encontrado!');
      },
    });

    this.formAtendimentos = this.formBuilder.group({
      '@type': ['Civil'],
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

    this.formAtendimentos.get('area')?.valueChanges.subscribe(area => {
      if (area === 'Civil') {
        this.medidasJudiciais = this.medidasCivil;
      } else if (area === 'Penal' || area === 'Família') {
        this.medidasJudiciais = this.medidasFamilia;
      }

      this.formAtendimentos.get('ficha.medidaJuridica')?.patchValue('');
      this.formAtendimentos.get('ficha.medidaJuridica')?.updateValueAndValidity();
    });

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
        nome: [null]
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

  abrirNovaGuia() {
    window.open('/assistidos/add', '_blank');
  }
}
