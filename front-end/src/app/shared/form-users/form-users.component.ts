import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Perfil } from 'src/app/core/types/usuario';
import {formValidations} from '../form-validations';

@Component({
  selector: 'app-form-users',
  templateUrl: './form-users.component.html',
  styleUrls: ['./form-users.component.scss']
})
export class FormUsersComponent implements OnInit {
  formCadastro!: FormGroup;
  perfilControl = new FormControl<Perfil | null>(null, Validators.required);
  @Input() perfilComponente!: boolean;
  @Output() acaoClique: EventEmitter<any> = new EventEmitter<any>();
  escondido = true;

  constructor (private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formCadastro = this.formBuilder.group({
      matricula: [null, Validators.required],
      nome: [null, Validators.required],
      telefone: [null],
      semestre: [null],
      status: [null],
      perfil: this.perfilControl,
      email: [null, [Validators.required, Validators.email]],
      senha: [null, Validators.required],
      confirmarEmail: [null, [Validators.required, Validators.email, formValidations.equalTo('email')]],
      confirmarSenha: [null, [Validators.required, Validators.minLength(3), formValidations.equalTo('senha')]],
    })
  }

  // função pra chamar o cadastrar ou editar no componente pai
  executarAcao() {
    this.acaoClique.emit();
  }
}
