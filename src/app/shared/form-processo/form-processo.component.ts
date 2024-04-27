import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsService } from 'src/app/core/services/forms.service';
import { Atendimento } from 'src/app/core/types/atendimento';

@Component({
  selector: 'app-form-processo',
  templateUrl: './form-processo.component.html',
  styleUrls: ['./form-processo.component.scss']
})
export class FormProcessoComponent implements OnInit {
  @Output() acaoClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() acaoExcluir: EventEmitter<any> = new EventEmitter<any>();
  @Input() editComponent: boolean = false;
  formProcessos!: FormGroup;
  status: string[] = [
    'Reprovado',
    'Arquivado',
    'Aguardando documentos',
    'Pendente distribuição',
    'Processo ativo',
    'Processo arquivado',
  ];
  atendimentoControl: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormsService
  ) { }

  ngOnInit(): void {
    this.formProcessos = this.formBuilder.group({
      atendimentoId: this.atendimentoControl,
      numero: [null, Validators.required],
      nome: [null, Validators.required],
      dataDistribuicao: [null, Validators.required],
      vara: [null, Validators.required],
      forum: [null, Validators.required],
      status: [null, Validators.required]
    });
    this.formService.setForm(this.formProcessos);
  }

  executarAcao() {
    this.acaoClick.emit();
  }

  excluir() {
    this.acaoExcluir.emit();
  }
}
