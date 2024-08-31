import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsService } from 'src/app/core/services/forms.service';
import { Usuario } from 'src/app/core/types/usuario';
import { formValidations } from '../form-validations';

@Component({
  selector: 'app-form-users',
  templateUrl: './form-users.component.html',
  styleUrls: ['./form-users.component.scss'],
})
export class FormUsersComponent implements OnInit {
  formCadastro!: FormGroup;
  senhaEscondida = true;
  perfis = [
    // { perfil: 'ADMINISTRADOR', viewperfil: 'Administrador' }, // EM BREVE
    { perfil: 'COORDENADOR', viewperfil: 'Coordenador' },
    { perfil: 'SECRETARIA', viewperfil: 'Secretária' },
    { perfil: 'PROFESSOR', viewperfil: 'Professor' },
    { perfil: 'ESTAGIARIO', viewperfil: 'Estagiario' },
  ];
  unidadeInstitucional = ['Taguatinga', 'Guará', 'Ceilândia'];
  @Input() myProfileComponente = false;
  @Input() editComponent = false;
  @Output() acaoNavegando: EventEmitter<void> = new EventEmitter<void>();
  @Output() acaoPermanecendo: EventEmitter<void> = new EventEmitter<void>();
  @Output() cliqueExcluir: EventEmitter<void> = new EventEmitter<void>();

  cadastrarSenhaControl: FormControl<boolean | null> = new FormControl<boolean | null>({ value: true, disabled: true });
  supervisorControl: FormControl<Usuario | null> = new FormControl<Usuario | null>({ value: null, disabled: this.myProfileComponente });

  constructor(
    private formBuilder: FormBuilder,
    private formUserService: FormsService,
  ) { }

  ngOnInit(): void {
    this.formCadastro = this.formBuilder.group({
      '@type': [null], // Campo do Back = Users/Usuários ou Estagiário
      cpf: [null, Validators.minLength(11)],
      matricula: [null],
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email, formValidations.domainValidator()]],
      confirmarEmail: [null, [Validators.required, Validators.email, formValidations.equalTo('email'), formValidations.domainValidator()]],
      supervisor: this.supervisorControl,
      semestre: [null],
      unidadeInstitucional: [null, Validators.required],
      status: [{ value: true, disabled: this.myProfileComponente }],
      cadastrarSenha: this.cadastrarSenhaControl,
      senha: [null, [Validators.required, Validators.minLength(6)]],
      confirmarSenha: [null, [Validators.required, Validators.minLength(6), formValidations.equalTo('senha')]],
      role: [{ value: null, disabled: this.myProfileComponente }, Validators.required],
    });

    this.formCadastro.get('role')?.valueChanges.subscribe(role => {
      const matriculaControl = this.formCadastro.get('matricula');
      const semestreControl = this.formCadastro.get('semestre');
      const typeControl = this.formCadastro.get('@type');

      if (role === 'ESTAGIARIO') {
        this.supervisorControl?.setValidators(Validators.required);
        matriculaControl?.setValidators(Validators.required);
        semestreControl?.setValidators(Validators.required);
        typeControl?.setValue('Estagiario');
      } else {
        this.supervisorControl?.clearValidators();
        matriculaControl?.clearValidators();
        semestreControl?.clearValidators();
        typeControl?.setValue('Usuario');
      }

      matriculaControl?.updateValueAndValidity();
      this.supervisorControl?.updateValueAndValidity();
      semestreControl?.updateValueAndValidity();
    });

    this.cadastrarSenhaControl.valueChanges.subscribe(valor => {
      const senhaControl = this.formCadastro.get('senha');
      const confirmarSenhaControl = this.formCadastro.get('confirmarSenha');

      if (valor === false && this.editComponent === false) {
        senhaControl?.clearValidators();
        confirmarSenhaControl?.clearValidators();
      } else {
        senhaControl?.setValidators([Validators.required, Validators.minLength(6)]);
        confirmarSenhaControl?.setValidators([Validators.required, Validators.minLength(6), formValidations.equalTo('senha')]);
      }

      senhaControl?.updateValueAndValidity();
      confirmarSenhaControl?.updateValueAndValidity();
    });

    this.formUserService.setForm(this.formCadastro);
  }

  executarAcaoNavegando() {
    this.acaoNavegando.emit();
  }

  executarAcaoPermanecendo() {
    this.acaoPermanecendo.emit();
  }

  excluir() {
    this.cliqueExcluir.emit();
  }
}
