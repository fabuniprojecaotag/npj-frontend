import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../types/usuario';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  /* para iniciar o fake back-end acesse ele no terminal e digite "npm start" para rodar o programa,
  verifique os arquivos package e package-lock se estão compativeis, caso não, exclua e reinstale na sua maquina */
  private readonly API = environment.APIFake;

  constructor(private http: HttpClient) { }

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.API, usuario);
  }

  logar(usuario: Usuario): Observable<boolean> {
    return this.http.post<boolean>(`${this.API}/logar`, usuario);
  }

  listar(pagina: number, filtro: string): Observable<Usuario[]> {
    const itensPerPage = 7;
    let params = new HttpParams().set('page', pagina.toString()).set('limit', itensPerPage.toString());

    if (filtro.trim().length > 2) {
      params = params.set('filtro', filtro);
    }

    return this.http.get<Usuario[]>(`${this.API}`, { params });
  }
}
