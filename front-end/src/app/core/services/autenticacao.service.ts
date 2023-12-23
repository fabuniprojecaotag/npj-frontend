import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../types/usuario';

interface AuthResponse {
  access_token: string;
  user: Usuario;
}

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  private API = environment.devAPI;

  constructor(private http: HttpClient, private userService: UsuarioService) { }

  autenticar(login: string, password: string): Observable<HttpResponse<AuthResponse>> {
    return this.http.post<AuthResponse>(`${this.API}/auth/login`, { login: login, password }, { observe: 'response' })
      .pipe(
        tap((response) => {
          console.log('Autenticação:', response.body?.access_token);
          const authToken = response.body?.access_token || '';
          this.userService.salvarToken(authToken);
        })
      );
  }
}
