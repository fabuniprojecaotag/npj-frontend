import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { UsuarioService } from './usuario.service';

interface AuthResponse {
  acess_token: string;
  result: any;
}

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  private API = environment.devAPI;

  constructor(private http: HttpClient, private userService: UsuarioService) {}

  autenticar(
    login: string,
    password: string
  ): Observable<HttpResponse<AuthResponse>> {
    return this.http
      .post<AuthResponse>(
        `${this.API}/auth`,
        { login, password },
        { observe: 'response' }
      )
      .pipe(
        tap((response) => {
          console.log('RESP');
          console.log(response.body);
          const authToken = response.body?.result[0].token || '';
          this.userService.salvarToken(authToken);
        })
      );
  }
}
