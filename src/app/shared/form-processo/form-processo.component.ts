import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsService } from 'src/app/core/services/forms.service';

@Component({
  selector: 'app-form-processo',
  templateUrl: './form-processo.component.html',
  styleUrls: ['./form-processo.component.scss']
})
export class FormProcessoComponent implements OnInit {
  @Output() acaoClick: EventEmitter<any> = new EventEmitter<any>();
  formProcessos!: FormGroup;
  status = ['ATIVO', 'ARQUIVADO'];

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormsService
  ) { }

  ngOnInit(): void {
    this.formProcessos = this.formBuilder.group({
      numero: [null, Validators.required],
      nome: [null, Validators.required],
      dataDistribuicao: [null, Validators.required],
      vara: [null, Validators.required],
      forum: [null, Validators.required],
      atendimentoId: [null, Validators.required],
      status: [null, Validators.required],
      // documento: [null]
    });
    this.formService.setForm(this.formProcessos);
  }

  executarAcao() {
    this.acaoClick.emit();
  }
}
