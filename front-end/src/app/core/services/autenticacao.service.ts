import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { UsuarioService } from './usuario.service';

interface AuthResponse {
  acess_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  private API = environment.devAPI;


  constructor(private http: HttpClient, private userService: UsuarioService) { }

  autenticar(login: string, password: string): Observable<HttpResponse<AuthResponse>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const data = { login, password };

    // if (this.authToken) {
    //   headers.set('Authorization', `Bearer ${this.authToken}`);
    // }

    return this.http.post<AuthResponse>(`${this.API}/auth`, data, { headers, observe: 'response'}).pipe(
      tap((resposta) => {
        const authToken = resposta.body?.acess_token || '';
        this.userService.salvarToken(authToken)
      })
    );
  }
}
