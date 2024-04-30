import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CadastroService } from 'src/app/core/services/cadastro.service';
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
  estagiarioControl: FormControl = new FormControl(null);
  professorControl: FormControl = new FormControl();
  secretariaControl: FormControl = new FormControl();
  assistidoControl: FormControl = new FormControl(null, Validators.required);
  arquivoSelecionado: File | null = null; // Variável para armazenar o nome do arquivo selecionado

  @Input() tipoAtendimento!: string;
  @Input() editarComponente: boolean = false;
  @Output() fileSelected: EventEmitter<File> = new EventEmitter<File>();
  @Output() acaoClique: EventEmitter<any> = new EventEmitter();

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
        }
      },
      error: () => {
        alert('Usuário não encontrado!');
      },
    });

    this.formAtendimentos = this.formBuilder.group({
      instante: [new Date()], // não necessario, o back irá retornar
      area: [this.tipoAtendimento],
      status: ['', Validators.required],
      ficha: this.formBuilder.group({
        assinatura: [null],
        dadosSensiveis: [false],
        testemunhas: this.formBuilder.array([this.criarGrupoTestemunha(), this.criarGrupoTestemunha()]),
        parteContraria: this.formBuilder.group({
          nome: [null, Validators.required],
          qualificacao: [null, Validators.required],
          rg: [null, Validators.pattern(/^\d{1,2}\.\d{3}\.\d{3}$/)],
          cpf: [null, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),],
          telefone: [null, [Validators.minLength(11)]],
          email: [null],
          cep: [null],
          cidade: [null],
          logradouro: [null],
          bairro: [null],
          numero: [null],
          complemento: [null],
          informacoesComplementares: [null]
        }),
        medidaJudicial: ['']
      }),
      historico: this.formBuilder.array([this.criarGrupoHistorico()]),
      envolvidos: this.formBuilder.group({
        estagiario: this.estagiarioControl,
        professor: this.professorControl,
        secretaria: this.secretariaControl,
        assistido: this.assistidoControl,
      })
    });

    this.formService.setForm(this.formAtendimentos);
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.arquivoSelecionado = file; // Define o nome do arquivo selecionado
  }

  removerArquivoSelecionado(): void {
    this.formAtendimentos.get('arquivos')?.setValue(null);
    this.arquivoSelecionado = null; // Reseta o nome do arquivo selecionado
  }

  /* funções para arrays */
  adicionarTestemunha(): void {
    (this.formAtendimentos.get('ficha')?.get('testemunhas') as FormArray).push(this.criarGrupoTestemunha());
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

  adicionarHistorico(): void {
    (this.formAtendimentos.get('historico') as FormArray).push(this.criarGrupoHistorico());
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
    this.acaoClique.emit();
  }
}
