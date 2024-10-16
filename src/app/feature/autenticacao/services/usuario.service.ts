import { Usuario } from 'src/app/core/types/usuario';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

  private decodificarJWT() {
    try {
      const token = this.tokenService.retornarToken();
      const usuario = jwtDecode(token) as Usuario;
      this.userSubject.next(usuario);
    } catch (error) {
      alert('Erro ao decodificar token');
    }
  }

  retornarTokenUsuario() {
    return this.userSubject.asObservable();
  }

  salvarToken(token: string) {
    this.tokenService.salvarToken(token);
    this.decodificarJWT();
  }

  logout() {
    this.tokenService.excluirToken();
    this.userSubject.next(null);
  }

  estaLogado(): boolean {
    return this.tokenService.possuiToken();
  }

  obterRoles(): string {
    const usuario = this.userSubject.getValue();
    return usuario?.role || '';
  }
}
