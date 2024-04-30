import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
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
        nome: ['', Validators.required],
        tipoPessoa: [''],
        numCadastro: [''],
        endereco: this.formBuilder.group({
          cep: [null],
          cidade: [null],
          logradouro: [null],
          bairro: [null],
          numero: [null],
          complemento: [null]
        }),
      }),
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
}
