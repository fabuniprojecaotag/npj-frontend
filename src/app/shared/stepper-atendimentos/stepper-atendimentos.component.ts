import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-stepper-atendimentos',
  templateUrl: './stepper-atendimentos.component.html',
  styleUrls: ['./stepper-atendimentos.component.scss']
})
export class StepperAtendimentosComponent implements OnInit {
  formAtendimentos!: FormGroup;
  primeiroGrupo!: FormGroup;
  segundoGrupo!: FormGroup;
  terceiroGrupo!: FormGroup;
  quartoGrupo!: FormGroup;
  quintoGrupo!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.primeiroGrupo = this.formBuilder.group({
      estagiario: [null, Validators.required],
      dataAtendimento: [this.pegarDataAtual(), Validators.required]
    });

    this.segundoGrupo = this.formBuilder.group({
      assistido: ['', Validators.required],
    });

    this.terceiroGrupo = this.formBuilder.group({
      nomeParteContraria: [null, Validators.required],
      qualificacaoParteContraria: [null, Validators.required],
      rgParteContraria: [null],
      cpfParteContraria: [null],
      telefoneParteContraria: [null],
      emailParteContraria: [null],
      enderecoParteContraria: [null],
    });

    this.quartoGrupo = this.formBuilder.group({
      nomeTestemunha1: [null],
      qualificacaoTestemunha1: [null],
      enderecoTestemunha1: [null],
      nomeTestemunha2: [null],
      qualificacaoTestemunha2: [null],
      enderecoTestemunha2: [null]
    });

    this.quintoGrupo = this.formBuilder.group({
      historico: [''],
    });

    this.formAtendimentos = this.formBuilder.group({
      primeiroGrupo: this.primeiroGrupo,
      segundoGrupo: this.segundoGrupo,
      terceiroGrupo: this.terceiroGrupo,
      quartoGrupo: this.quartoGrupo,
      quintoGrupo: this.quintoGrupo
    });
  }

  pegarDataAtual(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
