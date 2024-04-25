import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormsService } from 'src/app/core/services/forms.service';

@Component({
  selector: 'app-stepper-atendimentos',
  templateUrl: './stepper-atendimentos.component.html',
  styleUrls: ['./stepper-atendimentos.component.scss'],
})
export class StepperAtendimentosComponent implements OnInit {
  formAtendimentos!: any;
  primeiroGrupo!: FormGroup;
  segundoGrupo!: FormGroup;
  terceiroGrupo!: FormGroup;
  quartoGrupo!: FormGroup;
  quintoGrupo!: FormGroup;
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
  assistidoControl: FormControl = new FormControl(null, Validators.required);
  arquivoSelecionado: string | null = null; // Variável para armazenar o nome do arquivo selecionado

  @Input() tipoAtendimento!: string;
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
        this.estagiarioControl.setValue(usuario.nome);
      },
      error: () => {
        alert('Usuário não encontrado!');
      },
    });

    this.primeiroGrupo = this.formBuilder.group({
      estagiario: this.estagiarioControl,
      professor: this.professorControl,
      instante: [new Date()], // não necessario, o back irá retornar
      area: [this.tipoAtendimento],
    });
    this.segundoGrupo = this.formBuilder.group({
      assistido: this.assistidoControl,
    });
    this.terceiroGrupo = this.formBuilder.group({
      nome: [null, Validators.required],
      qualificacao: [null, Validators.required],
      rg: [null, Validators.pattern(/^\d{1,2}\.\d{3}\.\d{3}$/)],
      cpf: [
        null,
        Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
      ],
      telefone: [null, [Validators.minLength(11)]],
      email: [null],
      endereco: [null],
      informacoesComplementares: [null],
    });
    this.quartoGrupo = this.formBuilder.group({
      nomeTestemunha1: [null],
      qualificacaoTestemunha1: [null],
      enderecoTestemunha1: [null],
      nomeTestemunha2: [null],
      qualificacaoTestemunha2: [null],
      enderecoTestemunha2: [null],
    });
    this.quintoGrupo = this.formBuilder.group({
      historico: [''],
      medidaJuridica: [''],
      status: ['', Validators.required],
      arquivos: [null],
      dadosSensiveis: [false],
    });

    this.formAtendimentos = this.formBuilder.group({
      primeiroGrupo: this.primeiroGrupo,
      segundoGrupo: this.segundoGrupo,
      terceiroGrupo: this.terceiroGrupo,
      quartoGrupo: this.quartoGrupo,
      quintoGrupo: this.quintoGrupo,
    });

    this.formService.setForm(this.formAtendimentos);
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.arquivoSelecionado = file.name; // Define o nome do arquivo selecionado
  }

  // Método para remover o arquivo selecionado
  removerArquivoSelecionado(): void {
    this.quintoGrupo.get('arquivos')?.setValue(null);
    this.arquivoSelecionado = null; // Reseta o nome do arquivo selecionado
  }

  executarAcao() {
    this.acaoClique.emit();
  }
}
