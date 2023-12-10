import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../types/usuario';
import { TokenService } from './token.service';
import { jwtDecode } from 'jwt-decode';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private userSubject = new BehaviorSubject<Usuario | null>(null);
  private API = environment.devAPI;

  constructor(private tokenService: TokenService, private http: HttpClient) {
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
    this.userSubject.next(null);
  }

  estaLogado(): boolean {
    return this.tokenService.possuiToken();
  }

  listar() {
    // Define headers with Authorization Bearer token

    const jwtToken = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwtToken}`,
    });

    // Make the authenticated HTTP GET request
    return this.http.get(`${this.API}/user/all`, { headers });
  }
  // listar(pagina: number, filtro: string): Observable<Usuario[]> {
  //   const itensPerPage = 7;
  //   let params = new HttpParams().set('page', pagina.toString()).set('limit', itensPerPage.toString());

  //   if (filtro.trim().length > 2) {
  //     params = params.set('filtro', filtro);
  //   }

  //   return this.http.get<Usuario[]>(`${this.API}`, { params });
  // }
}
