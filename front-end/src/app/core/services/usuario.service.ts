import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../types/usuario';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly API = environment.APIFake;

  constructor(private http: HttpClient) { }

  autenticar (email: string, senha: string): Observable<any> {
    return this.http.post(`${this.API}/auth`, {email, senha});
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
