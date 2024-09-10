import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medida } from 'src/app/core/types/medida';
import { Payload } from 'src/app/core/types/payload';
import { Response } from 'src/app/core/types/response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedidasService {
  private API = environment.API_URL;
  private url = this.API + '/medidas juridicas';

  constructor(private http: HttpClient) { }

  listagemMedidas(): Observable<Response> {
    return this.http.get<Response>(`${this.url}`);
  }

  cadastrarMedida(medida: Medida): Observable<Medida> {
    return this.http.post<Medida>(`${this.url}`, medida);
  }

  consultarMedida(id: string): Observable<Medida> {
    return this.http.get<Medida>(`${this.url}/${id}`);
  }

  atualizarMedida(id: string, payload: Payload): Observable<Medida> {
    return this.http.put<Medida>(`${this.url}/${id}`, payload);
  }

  excluirMedida(id: string): Observable<Medida> {
    let body = {'ids': [id]};
    return this.http.delete<Medida>(`${this.url}`, { body });
  }
}
