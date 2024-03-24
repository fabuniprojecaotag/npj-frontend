import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  perfis = ["COORDENADOR", "ESTAGIARIO", "PROFESSOR", "SECRETARIA", "ADMINISTRADOR"];
  @Input() myProfileComponente: boolean = false;
  @Input() editComponent: boolean = false;
  @Output() acaoClique: EventEmitter<any> = new EventEmitter<any>();
  @Output() acaoClique2: EventEmitter<any> = new EventEmitter<any>();
  @Output() cliqueExcluir: EventEmitter<any> = new EventEmitter<any>();


  constructor(
    private formBuilder: FormBuilder,
    private formUserService: FormUserService,
  ) { }

  ngOnInit(): void {
    this.formCadastro = this.formBuilder.group({
      matricula: [null],
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      telefone: [null],
      semestre: [null],
      status: [{ value: true, disabled: this.myProfileComponente }],
      senha: [null, Validators.required],
      perfil: [{ value: null, disabled: this.myProfileComponente, }, Validators.required],
      confirmarEmail: [null, [Validators.required, Validators.email, formValidations.equalTo('email')]],
      confirmarSenha: [null,[Validators.required, Validators.minLength(3),formValidations.equalTo('senha')]],
    });

    this.formUserService.setCadastro(this.formCadastro);
  }


  // função pra chamar o cadastrar ou editar no componente pai
  executarAcao() {
    this.acaoClique.emit();
  }

  executarAcaoSemRedirecionar() {
    this.acaoClique.emit();
  }

  excluir() {
    this.cliqueExcluir.emit();
  }
}
