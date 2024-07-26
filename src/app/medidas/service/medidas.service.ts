import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medida } from 'src/app/core/types/medida';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedidasService {
  private API = environment.API_URL;

  constructor(private http: HttpClient) { }

  listagemMedidas(): Observable<Medida[]> {
    return this.http.get<Medida[]>(`${this.API}/medidas-juridicas`);
  }

  cadastrarMedida(medida: Medida): Observable<Medida> {
    return this.http.post<Medida>(`${this.API}/medidas-juridicas`, medida);
  }

  consultarMedida(nome: string): Observable<Medida> {
    return this.http.get<Medida>(`${this.API}/medidas-juridicas/${nome}`);
  }

  atualizarMedida(nome: string, medida: Medida): Observable<Medida> {
    return this.http.put<Medida>(`${this.API}/medidas-juridicas/${nome}`, medida);
  }

  excluirMedida(nome: string): Observable<Medida> {
    return this.http.delete<Medida>(`${this.API}/medidas-juridicas/${nome}`);
  }
}
