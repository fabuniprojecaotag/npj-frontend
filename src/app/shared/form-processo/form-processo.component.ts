import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-processo',
  templateUrl: './form-processo.component.html',
  styleUrls: ['./form-processo.component.scss']
})
export class FormProcessoComponent implements OnInit {

  formProcessos!: FormGroup;
  status = ['ATIVO', 'ARQUIVADO'];

  constructor(private formBuilder: FormBuilder) {

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
    }) 
  }

  executarAcao() {
    console.log("Funcionou!")
  }
}
