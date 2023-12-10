import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assistido } from '../types/assistido';
import { environment } from 'src/environments/environment.development';
import { Callback } from '../types/callback';

@Injectable({
  providedIn: 'root'
})
export class AssistidosService {
  private API = environment.devAPI;

  constructor(private http: HttpClient) { }

  cadastrarAssistido(assistido: Assistido): Observable<Assistido> {
    return this.http.post<Assistido>(`${this.API}/assistido/create`, assistido);
  }

  listarAssistidos(): Observable<Callback> {
    return this.http.get<Callback>(`${this.API}/assistido/all`);
  }

  editar () {}

  excluir () {}
}
