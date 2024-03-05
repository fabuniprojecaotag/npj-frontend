import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { Atendimento } from '../types/atendimento';
@Injectable({
  providedIn: 'root'
})
export class FormProcessosService {
  private API = environment.devAPI;

  constructor(private http: HttpClient) { }

  cadastroForm: FormGroup | null = null;

  getCadastro(): FormGroup | null {
    return this.cadastroForm;
  }

  setCadastro(form: FormGroup) {
    this.cadastroForm = form;
  }

  getAtendimentos():Observable<Atendimento[]> {
    return this.http.get<Atendimento[]>(`${this.API}/atendimentos`);
  }
}
