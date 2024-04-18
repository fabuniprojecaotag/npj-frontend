import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormsService } from 'src/app/core/services/forms.service';
import { Atendimento } from 'src/app/core/types/atendimento';

@Component({
  selector: 'app-stepper-atendimentos',
  templateUrl: './stepper-atendimentos.component.html',
  styleUrls: ['./stepper-atendimentos.component.scss']
})
export class StepperAtendimentosComponent implements OnInit {
  formAtendimentos!: any;
  primeiroGrupo!: FormGroup;
  segundoGrupo!: FormGroup;
  terceiroGrupo!: FormGroup;
  quartoGrupo!: FormGroup;
  quintoGrupo!: FormGroup;
  status: string[] = ['Reprovado', 'Arquivado', 'Aguardando documentos', 'Pendente distribuição', 'Processo ativo', 'Processo arquivado'];
  estagiarioControl: FormControl = new FormControl();
  assistidoControl: FormControl = new FormControl(null, Validators.required);
  arquivoSelecionado: string | null = null; // Variável para armazenar o nome do arquivo selecionado

  @Input() tipoAtendimento!: string;
  @Output() fileSelected: EventEmitter<File> = new EventEmitter<File>();
  @Output() acaoClique: EventEmitter<any> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormsService,
    private usuarioService: CadastroService,
  ) { }

  ngOnInit(): void {
    this.usuarioService.buscarMeuUsuario().subscribe({
      next: (usuario) => {
        this.estagiarioControl.setValue(usuario.nome);
      },
      error: (err) => {
        console.log("Usuário não encontrado!", err);
      }
    });

    this.formAtendimentos = this.formBuilder.group({
      primeiroGrupo: this.formBuilder.group({
        estagiario: this.estagiarioControl,
        dataAtendimento: [new Date().toISOString(), Validators.required],
        area: [this.tipoAtendimento]
      }),
      segundoGrupo: this.formBuilder.group({
        assistido: this.assistidoControl,
      }),
      terceiroGrupo: this.formBuilder.group({
        nomeParteContraria: [null, Validators.required],
        qualificacaoParteContraria: [null, Validators.required],
        rgParteContraria: [null],
        cpfParteContraria: [null],
        telefoneParteContraria: [null],
        emailParteContraria: [null],
        enderecoParteContraria: [null],
        informacoesComplementares: [null]
      }),
      quartoGrupo: this.formBuilder.group({
        nomeTestemunha1: [null],
        qualificacaoTestemunha1: [null],
        enderecoTestemunha1: [null],
        nomeTestemunha2: [null],
        qualificacaoTestemunha2: [null],
        enderecoTestemunha2: [null],
      }),
      quintoGrupo: this.formBuilder.group({
        historico: [''],
        medidaJuridica: [''],
        status: [''],
        arquivos: [null]
      })
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
