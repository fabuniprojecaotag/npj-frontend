import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormsService {
  cadastroForm: FormGroup | null = null;


  getForm(): FormGroup | null {
    return this.cadastroForm;
  }

  setForm(form: FormGroup) {
    this.cadastroForm = form;
  }
}
