import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Atendimento } from '../../core/types/atendimento';
import { Observable } from 'rxjs';
import { Filtro } from '../../core/types/filtro';
import { Response } from 'src/app/core/types/response';
import { Payload } from 'src/app/core/types/payload';

@Injectable({
  providedIn: 'root'
})
export class AtendimentosService {
  private API = environment.API_URL;
  private url = this.API + '/atendimentos';

  constructor(private http: HttpClient) { }

  listagemAtendimentos(filtro?: Filtro): Observable<Response> {
    let params = new HttpParams();
    if (filtro) {
      params = params
        .set('field', filtro.field)
        .set('filter', filtro.filter)
        .set('value', filtro.value);
    }
    return this.http.get<Response>(`${this.url}`, { params });
  }

  listagemAtendimentoAutocomplete(): Observable<any> {
    let params = new HttpParams().set('returnType', 'autoComplete');
    return this.http.get<Atendimento[]>(`${this.url}`, { params });
  }

  consultaAtendimento(id: string): Observable<Atendimento> {
    return this.http.get<Atendimento>(`${this.url}/${id}`);
  }

  cadastrarAtendimento(atendimento: Atendimento): Observable<Atendimento> {
    return this.http.post<Atendimento>(`${this.url}`, atendimento);
  }

  atualizarAtendimento(payload: Payload, id: string): Observable<Atendimento> {
    return this.http.put<Atendimento>(`${this.url}/${id}`, payload);
  }

  excluirAtendimento(id: string): Observable<Atendimento> {
    let body = {'ids': [id]};
    return this.http.delete<Atendimento>(`${this.url}/${id}`, { body });
  }
}
