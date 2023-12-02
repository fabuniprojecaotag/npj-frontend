import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-users',
  templateUrl: './form-users.component.html',
  styleUrls: ['./form-users.component.scss']
})
export class FormUsersComponent implements OnInit {
  formCadastro!: FormGroup;
  @Input() perfilComponente!: boolean;
  @Output() acaoClique: EventEmitter<any> = new EventEmitter<any>();

  constructor (private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formCadastro = this.formBuilder.group({
      matricula: [null, Validators.required],
      nome: [null, Validators.required],
      telefone: [null],
      semestre: [null],
      status: [null],
      emailAcademico: [null, [Validators.required, Validators.email]],
      senha: [null, Validators.required],
    })
  }

  // função pra chamar o cadastrar ou editar
  executarAcao() {
    this.acaoClique.emit();
  }
}
