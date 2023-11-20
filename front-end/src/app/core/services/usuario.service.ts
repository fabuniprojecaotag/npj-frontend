import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../types/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  /* para iniciar o fake back-end acesse ele no terminal e digite "npm start" para rodar o programa,
  verifique os arquivos package e package-lock se estão compativeis, caso não, exclua e reinstale na sua maquina */
  private readonly API = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) { }

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.API, usuario);
  }

  logar(usuario: Usuario): Observable<boolean> {
    return this.http.post<boolean>(`${this.API}/logar`, usuario)
  }
}
