import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Atendimento } from '../types/atendimento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtendimentosService {
  private API = environment.API_URL;

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

  atualizarAtendimento(atendimento: Atendimento, id: string): Observable<Atendimento> {
    return this.http.put<Atendimento>(`${this.API}/atendimentos/${id}`, atendimento);
  }

  excluirAtendimento(idAtendimento: string): Observable<Atendimento> {
    return this.http.delete<Atendimento>(`${this.API}/atendimentos/${idAtendimento}`);
  }
}
