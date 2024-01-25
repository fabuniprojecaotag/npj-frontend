import { HttpClient } from '@angular/common/http';
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

  listarAssistidos(): Observable<Assistido[]> {
    return this.http.get<Assistido[]>(`${this.API}/assistido/all`);
  }

  editar(idParam: string, assistido: Assistido): Observable<Assistido> {
    return this.http.put<Assistido>(`${this.API}/assistido/update/${idParam}`, assistido);
  }

  excluir(idParam: string): Observable<Assistido> {
    return this.http.delete<Assistido>(`${this.API}/assistido/delete/${idParam}`);
   }

  consultar(idParam: string): Observable<Assistido> {
    return this.http.get<Assistido>(`${this.API}/assistido/get/${idParam}`);
  }
}
