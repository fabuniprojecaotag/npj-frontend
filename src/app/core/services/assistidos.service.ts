import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assistido, AssistidoCivil, AssistidoFull, AssistidoTrabalhista } from '../types/assistido';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssistidosService {
  private API = environment.API_URL;

  constructor(private http: HttpClient) { }

  cadastrarAssistido(assistido: Assistido): Observable<AssistidoTrabalhista | AssistidoCivil | AssistidoFull> {
    return this.http.post<AssistidoTrabalhista | AssistidoCivil | AssistidoFull>(`${this.API}/assistidos`, assistido);
  }

  listarAssistidos(): Observable<AssistidoFull[]> {
    return this.http.get<AssistidoFull[]>(`${this.API}/assistidos`);
  }

  editar(idParam: string, assistido: Assistido): Observable<AssistidoTrabalhista | AssistidoCivil | AssistidoFull> {
    return this.http.put<AssistidoTrabalhista | AssistidoCivil | AssistidoFull>(`${this.API}/assistidos/${idParam}`, assistido);
  }

  excluir(idParam: string): Observable<AssistidoFull> {
    return this.http.delete<AssistidoFull>(`${this.API}/assistidos/${idParam}`);
   }

  consultar(idParam: string): Observable<AssistidoFull | AssistidoCivil | AssistidoTrabalhista> {
    return this.http.get<AssistidoFull | AssistidoCivil | AssistidoTrabalhista>(`${this.API}/assistidos/${idParam}`);
  }
}
