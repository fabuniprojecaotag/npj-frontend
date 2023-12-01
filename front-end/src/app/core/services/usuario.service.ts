import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../types/usuario';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly API = environment.devAPI;
  private authTokenKey = 'authToken';
  private authToken: string | null;

  constructor(private http: HttpClient) { this.authToken = localStorage.getItem(this.authTokenKey); }

  private saveAuthToken(token: string): void {
    this.authToken = token;
    localStorage.setItem(this.authTokenKey, token);
  }

  autenticar(login: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const data = { login, password };

    if (this.authToken) {
      headers.set('Authorization', `Bearer ${this.authToken}`);
    }

    const requisicao = this.http.post(`${this.API}/auth`, data, { headers });

    requisicao.subscribe({
      next: (resposta: any) => {
        if (resposta && resposta.token) {
          this.saveAuthToken(resposta.token);
        }
      },
      error: (err) => {
        console.log('Erro durante a autenticação:', err);
        console.log('Resposta de erro:', err.error);
      }
    });

    return requisicao;
  }

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.API, usuario);
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
