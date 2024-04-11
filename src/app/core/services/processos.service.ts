import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Processo } from '../types/processo';

@Injectable({
  providedIn: 'root'
})
export class ProcessosService {
  private API = environment.devAPI;

  constructor(private http: HttpClient) { }

  cadastraProcesso(processo: Processo): Observable<Processo> {
    return this.http.post<Processo>(`${this.API}/processos`, processo);
  }

  listar(): Observable<Processo[]> {
    return this.http.get<Processo[]>(`${this.API}/processos`);
  }

  consultarProcesso(idProcesso: string): Observable<Processo> {
    return this.http.get<Processo>(`${this.API}/processos/${idProcesso}`);
  }
}
