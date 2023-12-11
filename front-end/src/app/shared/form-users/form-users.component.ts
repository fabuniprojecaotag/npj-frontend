import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Perfil } from 'src/app/core/types/usuario';
import { formValidations } from '../form-validations';
import { FormUserService } from 'src/app/core/services/form-user.service';
import { RequestService } from 'src/app/core/services/request.service';
import { catchError, throwError } from 'rxjs';

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
  perfilControl = new FormControl<Perfil | null>({
    value: null,
    disabled: this.perfilComponente,
  }, Validators.required);

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormUserService,
    private requestService: RequestService
  ) {}

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
    this.loadPerfis();
  }

  loadPerfis() {
    this.requestService
      .get('perfil/all')
      .pipe(
        catchError((error) => {
          if (error.status == '401') {
            // alert('Dados incorretos');
          } else if (error.status === 0) {
            alert('A API está offline ou inacessível. Verifique sua conexão.');
          }
          return throwError(() => error);
        })
      )
      .subscribe((data) => {
        console.log('POST response:', data);
        this.perfis = data.result;
      });
  }

  // função pra chamar o cadastrar ou editar no componente pai
  executarAcao() {
    this.acaoClique.emit();
  }
}
