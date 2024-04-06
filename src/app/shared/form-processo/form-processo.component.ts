import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormProcessosService } from 'src/app/core/services/form-processos.service';

@Component({
  selector: 'app-form-processo',
  templateUrl: './form-processo.component.html',
  styleUrls: ['./form-processo.component.scss']
})
export class FormProcessoComponent implements OnInit {

  @Output() acaoClick: EventEmitter<any> = new EventEmitter<any>(); 
  formProcessos!: FormGroup;
  status = ['ATIVO', 'ARQUIVADO'];

  constructor(private formBuilder: FormBuilder, 
      private formService: FormProcessosService) {

  }

  ngOnInit(): void {
    this.formProcessos = this.formBuilder.group({
      nProcesso: [null, Validators.required],
      nomeAcao: [null, Validators.required],
      dataDistribuicao: [null, Validators.required],
      vara: [null, Validators.required],
      forum: [null, Validators.required],
      atendimento: [null, Validators.required],
      status: [null, Validators.required],
      documento: [null]
    });
    this.formService.setCadastro(this.formProcessos); 
  }

  executarAcao() {
    this.acaoClick.emit();
  }
}
