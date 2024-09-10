import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Assistido, AssistidoCivil, AssistidoFull, AssistidoTrabalhista } from '../../../core/types/assistido';
import { Response } from 'src/app/core/types/response';
import { Payload } from 'src/app/core/types/payload';

@Injectable({
  providedIn: 'root'
})
export class AssistidosService {
  private API = environment.API_URL;
  private url = this.API + '/assistidos';

  constructor(private http: HttpClient) { }

  cadastrarAssistido(assistido: Assistido): Observable<AssistidoTrabalhista | AssistidoCivil | AssistidoFull> {
    return this.http.post<AssistidoTrabalhista | AssistidoCivil | AssistidoFull>(`${this.url}`, assistido);
  }

  listarAssistidos(): Observable<Response> {
    return this.http.get<Response>(`${this.url}`);
  }

  listarAssistidosForAutoComplete(): Observable<Response> {
    let params = new HttpParams().set('returnType', 'autoComplete');
    return this.http.get<Response>(`${this.url}`, { params });
  }

  listarAtendimentosVinculados(id: string): Observable<Response> {
    let params = new HttpParams().set('returnType', 'forAssistido');
    return this.http.get<Response>(`${this.url}/${id}/atendimentos`, { params });
  }

  editarAssistido(id: string, payload: Payload): Observable<AssistidoTrabalhista | AssistidoCivil | AssistidoFull> {
    return this.http.put<AssistidoTrabalhista | AssistidoCivil | AssistidoFull>(`${this.url}/${id}`, payload);
  }

  excluirAssistido(id: string): Observable<AssistidoFull | AssistidoCivil | AssistidoTrabalhista> {
    let body = {'ids': [id]};
    return this.http.delete<AssistidoFull | AssistidoCivil | AssistidoTrabalhista>(`${this.url}`, { body });
  }

  consultarAssistido(id: string): Observable<AssistidoFull | AssistidoCivil | AssistidoTrabalhista> {
    return this.http.get<AssistidoFull | AssistidoCivil | AssistidoTrabalhista>(`${this.url}/${id}`);
  }
}
