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

  @Input() tipoAtendimento: string = 'Trabalhista';
  @Input() editarComponente: boolean = false;
  @Output() fileSelected: EventEmitter<File> = new EventEmitter<File>();
  @Output() acaoClique: EventEmitter<any> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: CadastroService,
    private formService: FormsService
  ) { }

  ngOnInit() {
    this.usuarioService.buscarMeuUsuario().subscribe({
      next: (usuario) => {
        this.estagiarioControl.setValue(usuario.nome);
      },
      error: () => {
        alert('Usuário não encontrado!');
      },
    });

    this.formAtendimentosTrabalhista = this.formBuilder.group({
      status: [null],
      area: [this.tipoAtendimento],
      ficha: this.formBuilder.group({
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
        relacaoEmpregaticia: this.formBuilder.group({
          dataAdmissao: [null],
          dataSaida: [null]
        }),
        testemunhas: this.formBuilder.array([this.criarGrupoTestemunha(), this.criarGrupoTestemunha()])
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

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.arquivoSelecionado = file;
    this.formAtendimentosTrabalhista.get('ficha.assinatura')?.setValue(file);
  }

  removerArquivoSelecionado(): void {
    this.formAtendimentosTrabalhista.get('ficha.assinatura')?.setValue(null);
    this.arquivoSelecionado = null; // Reseta o nome do arquivo selecionado
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
