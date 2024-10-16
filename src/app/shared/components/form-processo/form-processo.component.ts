import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsService } from 'src/app/core/services/forms.service';

@Component({
  selector: 'app-form-processo',
  templateUrl: './form-processo.component.html',
  styleUrls: ['./form-processo.component.scss']
})
export class FormProcessoComponent implements OnInit {
  formProcessos!: FormGroup;
  atendimentoControl: FormControl<string | null> = new FormControl<string | null>(null, [Validators.required]);

  @Output() acaoNavegando: EventEmitter<void> = new EventEmitter<void>();
  @Output() acaoPermanecendo: EventEmitter<void> = new EventEmitter<void>();
  @Output() acaoExcluir: EventEmitter<void> = new EventEmitter<void>();
  @Input() editComponent = false;

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormsService
  ) { }

  ngOnInit(): void {
    this.formProcessos = this.formBuilder.group({
      atendimentoId: this.atendimentoControl,
      numero: [{value: null, disabled: this.editComponent}, Validators.required],
      nome: [null, Validators.required],
      dataDistribuicao: [null, Validators.required],
      vara: [null, Validators.required],
      forum: [null, Validators.required],
      status: [null, Validators.required],
      assistidoId: [null, [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]]
    });
    this.formService.setForm(this.formProcessos);
  }

  executarAcaoNavegando() {
    this.acaoNavegando.emit();
  }

  executarAcaoPermanecendo() {
    this.acaoPermanecendo.emit();
  }

  excluir() {
    this.acaoExcluir.emit();
  }
}
