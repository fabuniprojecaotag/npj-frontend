import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../../../core/types/usuario';
import { Observable } from 'rxjs';
import { Filtro } from '../../../core/types/filtro';
import { Response } from 'src/app/core/types/response';
import { Payload } from 'src/app/core/types/payload';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  private API = environment.API_URL;
  private url = this.API + '/usuarios';

  constructor(private http: HttpClient) {}

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.url}`, usuario);
  }

  buscarCadastro(email: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}/${email}`);
  }

  buscarMeuUsuario(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}/me`);
  }

  listarUsuarios(filtro?: Filtro): Observable<Response> {
    let params = new HttpParams();
    if (filtro) {
      params = params
        .set('field', filtro.field)
        .set('filter', filtro.filter)
        .set('value', filtro.value);
    }
    return this.http.get<Response>(`${this.url}`, { params });
  }

  listarUsuariosForAutoComplete(filtro?: Filtro): Observable<Response> {
    let params = new HttpParams();
    if (filtro) {
      params = params
        .set('field', filtro.field)
        .set('filter', filtro.filter)
        .set('value', filtro.value)
        .set('returnType', 'autoComplete');
    }
    return this.http.get<Response>(`${this.url}`, { params });
  }

  editarCadastro(payload: Payload, userEmail: string): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.url}/${userEmail}`, payload);
  }

  excluirCadastro(userEmail: string) {
    let body = {'ids': [userEmail]};
    return this.http.delete(`${this.url}`, { body });
  }
}
