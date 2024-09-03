import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payload } from 'src/app/core/types/payload';
import { Response } from 'src/app/core/types/response';
import { environment } from 'src/environments/environment';
import { Processo } from '../../../core/types/processo';

@Injectable({
  providedIn: 'root'
})
export class ProcessosService {
  private API = environment.API_URL;
  private url = this.API + '/processos';

  constructor(private http: HttpClient) { }

  cadastraProcesso(processo: Processo): Observable<Processo> {
    return this.http.post<Processo>(`${this.url}`, processo);
  }

  listarProcessos(): Observable<Response> {
    return this.http.get<Response>(`${this.url}`);
  }

  consultarProcesso(id: string): Observable<Processo> {
    return this.http.get<Processo>(`${this.url}/${id}`);
  }

  editarProcesso(id: string, payload: Payload): Observable<Processo> {
    return this.http.put<Processo>(`${this.url}/${id}`, payload);
  }

  excluirProcesso(id: string): Observable<Processo> {
    let body = {'ids': [id]};
    return this.http.delete<Processo>(`${this.url}`, { body });
  }
}
