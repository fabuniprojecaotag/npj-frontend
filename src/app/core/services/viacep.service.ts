import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cep } from '../types/cep';

@Injectable({
  providedIn: 'root'
})
export class ViacepService {
  private baseUrl = 'https://viacep.com.br/ws/';

  constructor(private http: HttpClient) { }

  consultarCep(cep: String): Observable<Cep>{
    return this.http.get<Cep>(`${this.baseUrl}${cep}/json`);
  }
}
