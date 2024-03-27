import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-stepper-atendimentos',
  templateUrl: './stepper-atendimentos.component.html',
  styleUrls: ['./stepper-atendimentos.component.scss']
})
export class StepperAtendimentosComponent implements OnInit {
  formAtendimentos!: FormGroup;
  isLinear = true;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formAtendimentos = this.formBuilder.group({
      primeiroGrupo: this.formBuilder.group({
        estagiario: [null, Validators.required],
        dataAtendimento: [null, Validators.required]
      }),
      segundoGrupo: this.formBuilder.group({
        assistido: ['', Validators.required],
      }),
      terceiroGrupo: this.formBuilder.group({
        nomeTestemunha1: [null],
      }),
      quartoGrupo: this.formBuilder.group({
        nomeParteContraria: [null, Validators.required],
      }),
      quintoGrupo: this.formBuilder.group({
        historico: [''],
      })
    });
  }
}
