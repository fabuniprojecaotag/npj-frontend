import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../types/usuario';
import { TokenService } from './token.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private userSubject = new BehaviorSubject<Usuario | null>(null);

  constructor(private tokenService: TokenService) {
    if (this.tokenService.possuiToken()) {
      this.decodificarJWT();
    }
  }

  decodificarJWT() {
    const token = this.tokenService.retornarToken();
    const usuario = jwtDecode(token) as Usuario;
    this.userSubject.next(usuario);
  }

  retornarUsuario() {
    return this.userSubject.asObservable();
  }

  salvarToken(token: string) {
    this.tokenService.salvarToken(token);
    this.decodificarJWT();
  }

  logout() {
    this.tokenService.excluirToken();
    localStorage.removeItem('user_data');
    this.userSubject.next(null);
  }

  estaLogado(): boolean {
    return this.tokenService.possuiToken();
  }
}
