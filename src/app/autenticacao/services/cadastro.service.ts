import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../../core/types/usuario';
import { Observable } from 'rxjs';
import { Filtro } from '../../core/types/filtro';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/usuarios`, usuario);
  }

  buscarCadastro(email: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/usuarios/${email}`);
  }

  buscarMeuUsuario(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/usuarios/me`);
  }

  listarUsuarios(filtro?: Filtro): Observable<Usuario[]> {
    let params = new HttpParams();
    if (filtro) {
      params = params
        .set('field', filtro.field)
        .set('filter', filtro.filter)
        .set('value', filtro.value);
    }
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`, { params });
  }

  listarUsuariosMin(filtro?: Filtro): Observable<Usuario[]> {
    let params = new HttpParams();
    if (filtro) {
      params = params
        .set('field', filtro.field)
        .set('filter', filtro.filter)
        .set('value', filtro.value);
    }
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios/min`, { params });
  }

  editarCadastro(usuario: Usuario, userEmail: string): Observable<Usuario> {
    return this.http.put<Usuario>(
      `${this.apiUrl}/usuarios/${userEmail}`,
      usuario
    );
  }

  excluirCadastro(userEmail: string) {
    return this.http.delete(`${this.apiUrl}/usuarios/${userEmail}`);
  }
}
