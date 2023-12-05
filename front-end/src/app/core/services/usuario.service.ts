import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../types/usuario';
import { TokenService } from './token.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private userSubject = new BehaviorSubject<Usuario | null>(null);

  constructor(private tokenService: TokenService) {
    if (this.tokenService.possuiToken()) {
      this.decodificarJWT()
    }
  }

  decodificarJWT() {
    const token = this.tokenService.retornarToken();
    const usuario = jwtDecode(token) as Usuario;
    this.userSubject.next(usuario);
  }

  retornarUsuario () {
    return this.userSubject.asObservable();
  }

  salvarToken (token: string) {
    this.tokenService.salvarToken(token);
    this.decodificarJWT();
  }

  logout () {
    this.tokenService.excluirToken();
    this.userSubject.next(null);
  }

  estaLogado(): boolean {
    return this.tokenService.possuiToken();
  }


  // cadastrar(usuario: Usuario): Observable<Usuario> {
  //   return this.http.post<Usuario>(this.API, usuario);
  // }

  // listar(pagina: number, filtro: string): Observable<Usuario[]> {
  //   const itensPerPage = 7;
  //   let params = new HttpParams().set('page', pagina.toString()).set('limit', itensPerPage.toString());

  //   if (filtro.trim().length > 2) {
  //     params = params.set('filtro', filtro);
  //   }

  //   return this.http.get<Usuario[]>(`${this.API}`, { params });
  // }
}
