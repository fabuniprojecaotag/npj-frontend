import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formValidations } from 'src/app/shared/form-validations';

@Injectable({
  providedIn: 'root'
})
export class FormUserService {
  cadastroForm: FormGroup | null = null;

//   constructor() {
//     this.cadastroForm = new FormGroup({
//       matricula: new FormControl(null, Validators.required),
//       nome: new FormControl(null, Validators.required),
//       telefone: new FormControl(null),
//       semestre: new FormControl(null),
//       status: new FormControl({value: true, disabled: this.perfilComponente}),
//       email: new FormControl(null, [Validators.email, Validators.required]),
//       senha: new FormControl(null, Validators.required),
//       perfil: new FormControl({ value: null, disabled: this.perfilComponente, }, Validators.required),
//       confirmarEmail:  new FormControl(null, [Validators.required, Validators.email, formValidations.equalTo('email')]),
//       confirmarSenha:  new FormControl(null, [Validators.required, Validators.minLength(3), formValidations.equalTo('senha')]),
//     });
// }

getCadastro(): FormGroup | null {
  return this.cadastroForm;
}

setCadastro(form: FormGroup) {
  this.cadastroForm = form;
}
}
