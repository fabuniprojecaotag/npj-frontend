import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsService } from 'src/app/core/services/forms.service';

@Component({
  selector: 'app-form-medidas',
  templateUrl: './form-medidas.component.html',
  styleUrls: ['./form-medidas.component.scss']
})
export class FormMedidasComponent implements OnInit {
  @Output() acaoInserir: EventEmitter<void> = new EventEmitter<void>();
  @Output() acaoInserirEPermanecer: EventEmitter<void> = new EventEmitter<void>();
  @Output() acaoSubmeter: EventEmitter<void> = new EventEmitter<void>();
  @Output() acaoExcluir: EventEmitter<void> = new EventEmitter<void>();
  @Input() salvarComponent = false;
  @Input() editComponent = false;
  formMedidas!: FormGroup;
  areas: string[] = [
    'Cívil',
    'Família'
  ]

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormsService
  ) { }

  ngOnInit(): void {
    this.formMedidas = this.formBuilder.group({
      id: [{ value: null, disabled: this.salvarComponent }],
      nome: [null, Validators.required],
      area: [null, Validators.required],
      descricao: [null]
    });

    this.formService.setForm(this.formMedidas);
  }

  emitirAcaoInserir() {
    this.acaoInserir.emit();
  }

  emitirAcaoInserirEPermanecer() {
    this.acaoInserirEPermanecer.emit();
  }

  emitirAcaoSubmeter() {
    this.acaoSubmeter.emit();
  }

  emitirAcaoExcluir() {
    this.acaoExcluir.emit();
  }
}
