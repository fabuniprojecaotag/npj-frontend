import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { formValidations } from '../form-validations';
import { FormUserService } from 'src/app/core/services/form-user.service';

@Component({
  selector: 'app-form-users',
  templateUrl: './form-users.component.html',
  styleUrls: ['./form-users.component.scss'],
})
export class FormUsersComponent implements OnInit {
  formCadastro!: FormGroup;
  escondido = true;
  perfis = [];
  @Input() perfilComponente: boolean = false;
  @Output() acaoClique: EventEmitter<any> = new EventEmitter<any>();
  @Output() cliqueExcluir: EventEmitter<any> = new EventEmitter<any>();
  perfilControl = new FormControl<string | null>({
    value: null,
    disabled: this.perfilComponente,
  }, Validators.required);

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormUserService,
  ) { }

  ngOnInit(): void {
    this.formCadastro = this.formBuilder.group({
      matricula: [null, Validators.required],
      nome: [null, Validators.required],
      telefone: [null],
      semestre: [null],
      status: [{ value: null, disabled: this.perfilComponente }],
      perfil: this.perfilControl,
      email: [null, [Validators.required, Validators.email]],
      senha: [null, Validators.required],
      confirmarEmail: [
        null,
        [
          Validators.required,
          Validators.email,
          formValidations.equalTo('email'),
        ],
      ],
      confirmarSenha: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          formValidations.equalTo('senha'),
        ],
      ],
    });

    this.formService.setCadastro(this.formCadastro);
  }


  // função pra chamar o cadastrar ou editar no componente pai
  executarAcao() {
    this.acaoClique.emit();
  }

  excluir() {
    this.cliqueExcluir.emit();
  }
}