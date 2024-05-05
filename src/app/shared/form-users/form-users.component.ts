import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { formValidations } from '../form-validations';
import { FormsService } from 'src/app/core/services/forms.service';
import { Usuario } from 'src/app/core/types/usuario'; // Certifique-se de importar o tipo Usuario

@Component({
  selector: 'app-form-users',
  templateUrl: './form-users.component.html',
  styleUrls: ['./form-users.component.scss'],
})
export class FormUsersComponent implements OnInit {
  formCadastro!: FormGroup;
  escondido = true;
  perfis = [
    { perfil: 'COORDENADOR', viewperfil: 'Coordenador' },
    { perfil: 'ADMINISTRADOR', viewperfil: 'Administrador' },
    { perfil: 'ESTAGIARIO', viewperfil: 'Estagiario' },
    { perfil: 'SECRETARIA', viewperfil: 'Secretária' },
    { perfil: 'PROFESSOR', viewperfil: 'Professor' },
  ];
  unidadeInstitucional = ['Taguatinga', 'Guará', 'Ceilândia'];
  @Input() myProfileComponente: boolean = false;
  @Input() editComponent: boolean = false;
  @Output() acaoClique: EventEmitter<any> = new EventEmitter<any>();
  @Output() acaoClique2: EventEmitter<any> = new EventEmitter<any>();
  @Output() cliqueExcluir: EventEmitter<any> = new EventEmitter<any>();

  cadastrarSenhaControl: FormControl<boolean | null> = new FormControl<boolean | null>(false);
  supervisorControl: FormControl<Usuario | null> = new FormControl<Usuario | null>({ value: null, disabled: this.myProfileComponente });


  constructor(
    private formBuilder: FormBuilder,
    private formUserService: FormsService,
  ) { }

  ngOnInit(): void {
    this.formCadastro = this.formBuilder.group({
      "@type": [null],
      cpf: [null, Validators.minLength(11)],
      matricula: [null],
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email, formValidations.domainValidator]],
      confirmarEmail: [null, [Validators.required, Validators.email, formValidations.equalTo('email'), formValidations.domainValidator]],
      supervisor: this.supervisorControl,
      semestre: [null],
      unidadeInstitucional: [null, Validators.required],
      status: [{ value: true, disabled: this.myProfileComponente }],
      cadastrarSenha: this.cadastrarSenhaControl,
      senha: [null],
      confirmarSenha: [null],
      role: [{ value: null, disabled: this.myProfileComponente }, Validators.required],
    });

    this.formCadastro.get('role')?.valueChanges.subscribe(role => {
      const matriculaControl = this.formCadastro.get('matricula');
      const semestreControl = this.formCadastro.get('semestre');
      const typeControl = this.formCadastro.get('@type');

      if (role === 'ESTAGIARIO') {
        matriculaControl?.setValidators(Validators.required);
        this.supervisorControl?.setValidators(Validators.required);
        semestreControl?.setValidators(Validators.required);
        typeControl?.setValue('Estagiario');
      } else {
        matriculaControl?.clearValidators();
        this.supervisorControl?.clearValidators();
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
        senhaControl?.setValidators(Validators.required);
        confirmarSenhaControl?.setValidators([Validators.required, Validators.minLength(3), formValidations.equalTo('senha')]);
      }

      senhaControl?.updateValueAndValidity();
      confirmarSenhaControl?.updateValueAndValidity();
    });

    this.formUserService.setForm(this.formCadastro);
  }

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
