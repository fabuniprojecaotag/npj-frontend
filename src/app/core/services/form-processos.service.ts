import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormProcessosService {

  processoForm: FormGroup | null = null;

  getCadastro(): FormGroup | null {
    return this.processoForm;
  }

  setCadastro(form: FormGroup) {
    this.processoForm = form;
  }

  constructor() { }
}
