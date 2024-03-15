import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Atendimento } from '../types/atendimento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtendimentosService {

  private API = environment.devAPI;
  constructor(private http: HttpClient) { }

  listagemAtendimentos(): Observable<Atendimento[]>{
    return this.http.get<Atendimento[]>(`${this.API}/atendimentos`);
  };
}
