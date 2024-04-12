import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormsService } from 'src/app/core/services/forms.service';

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
  status: string[] = ['ATIVO', 'ARQUIVADO'];
  estagiarioControl: FormControl = new FormControl();
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
        console.log("Usuário não encontrado!");
      }
    });

    this.primeiroGrupo = this.formBuilder.group({
      estagiario: this.estagiarioControl,
      dataAtendimento: [new Date().toISOString(), Validators.required]
    });

    this.segundoGrupo = this.formBuilder.group({
      assistido: ['', Validators.required],
    });

    this.terceiroGrupo = this.formBuilder.group({
      nomeParteContraria: [null, Validators.required],
      qualificacaoParteContraria: [null, Validators.required],
      rgParteContraria: [null],
      cpfParteContraria: [null],
      telefoneParteContraria: [null],
      emailParteContraria: [null],
      enderecoParteContraria: [null],
      informacoesComplementares: [null]
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
      status: [''],
      arquivos: [null]
    });

    this.formAtendimentos = this.formBuilder.group({
      primeiroGrupo: this.primeiroGrupo,
      segundoGrupo: this.segundoGrupo,
      terceiroGrupo: this.terceiroGrupo,
      quartoGrupo: this.quartoGrupo,
      quintoGrupo: this.quintoGrupo
    });

    this.formService.setForm(this.formAtendimentos);
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.quintoGrupo.get('arquivos')?.setValue(file);
  }

  executarAcao() {
    this.acaoClique.emit();
  }
}
