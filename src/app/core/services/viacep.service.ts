import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CepDados } from '../types/cep';

@Injectable({
  providedIn: 'root'
})
export class ViacepService {
  private baseUrl = 'https://viacep.com.br/ws/';

  constructor(private http: HttpClient) { }

  consultarCep(cep: String): Observable<CepDados>{
    return this.http.get<CepDados>(`${this.baseUrl}${cep}/json`);
  }
}
