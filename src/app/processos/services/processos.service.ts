import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Processo } from '../../core/types/processo';

@Injectable({
  providedIn: 'root'
})
export class ProcessosService {
  private API = environment.API_URL;

  constructor(private http: HttpClient) { }

  cadastraProcesso(processo: Processo): Observable<Processo> {
    return this.http.post<Processo>(`${this.API}/processos`, processo);
  }

  listarProcessos(): Observable<Processo[]> {
    return this.http.get<Processo[]>(`${this.API}/processos`);
  }

  consultarProcesso(idProcesso: string): Observable<Processo> {
    return this.http.get<Processo>(`${this.API}/processos/${idProcesso}`);
  }

  editarProcesso(idProcesso: string, processo: Processo): Observable<Processo> {
    return this.http.put<Processo>(`${this.API}/processos/${idProcesso}`, processo);
  }

  excluirProcesso(idProcesso: string): Observable<Processo> {
    return this.http.delete<Processo>(`${this.API}/processos/${idProcesso}`);
  }
}
