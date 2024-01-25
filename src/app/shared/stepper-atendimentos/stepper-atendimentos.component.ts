import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-stepper-atendimentos',
  templateUrl: './stepper-atendimentos.component.html',
  styleUrls: ['./stepper-atendimentos.component.scss']
})
export class StepperAtendimentosComponent {
  atendimentoFormGroup: FormGroup = this._formBuilder.group({
    firstGroup: this._formBuilder.group({
      estagiario: ['', Validators.required],
    }),
    secondGroup: this._formBuilder.group({
      assistido: ['', Validators.required],
    }),
    thirdGroup: this._formBuilder.group({
      historico: [''],
    }),
  });
  isLinear = true;

  constructor(private _formBuilder: FormBuilder) {}
}
