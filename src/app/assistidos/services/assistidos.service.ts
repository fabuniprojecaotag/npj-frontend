import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Atendimento } from 'src/app/core/types/atendimento';
import { environment } from 'src/environments/environment';
import { Assistido, AssistidoCivil, AssistidoFull, AssistidoTrabalhista } from '../../core/types/assistido';

@Injectable({
  providedIn: 'root'
})
export class AssistidosService {
  private API = environment.API_URL;

  constructor(private http: HttpClient) { }

  cadastrarAssistido(assistido: Assistido): Observable<AssistidoTrabalhista | AssistidoCivil | AssistidoFull> {
    return this.http.post<AssistidoTrabalhista | AssistidoCivil | AssistidoFull>(`${this.API}/assistidos`, assistido);
  }

  listarAssistidos(): Observable<(AssistidoCivil | AssistidoFull | AssistidoTrabalhista)[]> {
    return this.http.get<(AssistidoCivil | AssistidoFull | AssistidoTrabalhista)[]>(`${this.API}/assistidos`);
  }

  listarAssistidosMin(): Observable<(AssistidoCivil | AssistidoFull | AssistidoTrabalhista)[]> {
    return this.http.get<(AssistidoCivil | AssistidoFull | AssistidoTrabalhista)[]>(`${this.API}/assistidos/min`);
  }

  listagemAtendimentosDoAssistido(id: string): Observable<Atendimento[]> {
    return this.http.get<Atendimento[]>(`${this.API}/assistidos/${id}/atendimentos`);
  }

  editarAssistido(idParam: string, assistido: Assistido): Observable<AssistidoTrabalhista | AssistidoCivil | AssistidoFull> {
    return this.http.put<AssistidoTrabalhista | AssistidoCivil | AssistidoFull>(`${this.API}/assistidos/${idParam}`, assistido);
  }

  excluirAssistido(idParam: string): Observable<AssistidoFull | AssistidoCivil | AssistidoTrabalhista> {
    return this.http.delete<AssistidoFull | AssistidoCivil | AssistidoTrabalhista>(`${this.API}/assistidos/${idParam}`);
  }

  consultarAssistido(idParam: string): Observable<AssistidoFull | AssistidoCivil | AssistidoTrabalhista> {
    return this.http.get<AssistidoFull | AssistidoCivil | AssistidoTrabalhista>(`${this.API}/assistidos/${idParam}`);
  }
}
