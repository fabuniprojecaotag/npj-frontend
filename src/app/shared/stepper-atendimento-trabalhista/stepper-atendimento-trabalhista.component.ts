import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormsService } from 'src/app/core/services/forms.service';

@Component({
  selector: 'app-stepper-atendimento-trabalhista',
  templateUrl: './stepper-atendimento-trabalhista.component.html',
  styleUrls: ['./stepper-atendimento-trabalhista.component.scss']
})
export class StepperAtendimentoTrabalhistaComponent implements OnInit {
  formAtendimentosTrabalhista!: any;
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

  @Input() tipoAtendimento: string = 'Trabalhista';
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

    this.primeiroGrupo = this.formBuilder.group({
      estagiario: this.estagiarioControl,
      professor: this.professorControl,
      area: [this.tipoAtendimento],
    });
    this.segundoGrupo = this.formBuilder.group({
      assistido: this.assistidoControl,
    });
    this.terceiroGrupo = this.formBuilder.group({

    });
    this.quartoGrupo = this.formBuilder.group({

    });
    this.quintoGrupo = this.formBuilder.group({

    });

    this.formAtendimentosTrabalhista = this.formBuilder.group({
      primeiroGrupo: this.primeiroGrupo,
      segundoGrupo: this.segundoGrupo,
      terceiroGrupo: this.terceiroGrupo,
      quartoGrupo: this.quartoGrupo,
      quintoGrupo: this.quintoGrupo,
    });

    this.formService.setForm(this.formAtendimentosTrabalhista);
  }

  executarAcao() {
    this.acaoClique.emit();
  }
}
