import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Atendimento } from '../types/atendimento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtendimentosService {
  private API = environment.devAPI;

  constructor(private http: HttpClient) { }

  listagemAtendimentos(): Observable<Atendimento[]> {
    return this.http.get<Atendimento[]>(`${this.API}/atendimentos`);
  };

  consultaAtendimento(idAtendimento: string): Observable<Atendimento> {
    return this.http.get<Atendimento>(`${this.API}/atendimentos/${idAtendimento}`);
  }

  cadastrarAtendimento(atendimento: Atendimento): Observable<Atendimento> {
    return this.http.post<Atendimento>(`${this.API}/atendimentos`, atendimento);
  }

  excluirAtendimento(idAtendimento: string): Observable<Atendimento> {
    return this.http.delete<Atendimento>(`${this.API}/atendimentos/${idAtendimento}`);
  }
}
