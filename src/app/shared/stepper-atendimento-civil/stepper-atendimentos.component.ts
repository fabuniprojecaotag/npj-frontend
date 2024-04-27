import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
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
  formAtendimentos!: FormGroup;
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
      cep: [null],
      cidade: [null],
      logradouro: [null],
      bairro: [null],
      numero: [null],
      complemento: [null],
      informacoesComplementares: [null],
    });
    this.quartoGrupo = this.formBuilder.group({
      testemunhas: this.formBuilder.array([this.criarGrupoTestemunha(), this.criarGrupoTestemunha()])
    });
    this.quintoGrupo = this.formBuilder.group({
      historico: [''],
      medidaJudicial: [''],
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
    this.arquivoSelecionado = file; // Define o nome do arquivo selecionado
  }

  removerArquivoSelecionado(): void {
    this.quintoGrupo.get('arquivos')?.setValue(null);
    this.arquivoSelecionado = null; // Reseta o nome do arquivo selecionado
  }

  adicionarTestemunha(): void {
    (this.quartoGrupo.get('testemunhas') as FormArray).push(this.criarGrupoTestemunha());
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


  get testemunhas(): FormArray {
    return this.quartoGrupo.get('testemunhas') as FormArray;
  }

  executarAcao() {
    this.acaoClique.emit();
  }
}
