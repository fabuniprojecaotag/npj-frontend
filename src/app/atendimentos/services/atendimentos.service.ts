import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Atendimento } from '../../core/types/atendimento';
import { Observable } from 'rxjs';
import { Filtro } from '../../core/types/filtro';

@Injectable({
  providedIn: 'root'
})
export class AtendimentosService {
  private API = environment.API_URL;

  constructor(private http: HttpClient) { }

  listagemAtendimentos(filtro?: Filtro): Observable<Atendimento[]> {
    let params = new HttpParams();
    if (filtro) {
      params = params
        .set('field', filtro.field)
        .set('filter', filtro.filter)
        .set('value', filtro.value);
    }
    return this.http.get<Atendimento[]>(`${this.API}/atendimentos`, { params });
  }

  listagemAtendimentoAutocomplete(): Observable<Atendimento[]> {
    return this.http.get<Atendimento[]>(`${this.API}/atendimentos/min`);
  }

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
