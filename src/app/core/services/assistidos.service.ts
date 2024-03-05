import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assistido } from '../types/assistido';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AssistidosService {
  private API = environment.devAPI;

  constructor(private http: HttpClient) { }

  cadastrarAssistido(assistido: Assistido): Observable<Assistido> {
    return this.http.post<Assistido>(`${this.API}/assistidos`, assistido);
  }

  listarAssistidos(): Observable<Assistido[]> {
    return this.http.get<Assistido[]>(`${this.API}/assistidos`);
  }

  editar(idParam: string, assistido: Assistido): Observable<Assistido> {
    return this.http.put<Assistido>(`${this.API}/assistidos/${idParam}`, assistido);
  }

  excluir(idParam: string): Observable<Assistido> {
    return this.http.delete<Assistido>(`${this.API}/assistidos/${idParam}`);
   }

  consultar(idParam: string): Observable<Assistido> {
    return this.http.get<Assistido>(`${this.API}/assistidos/${idParam}`);
  }
}
