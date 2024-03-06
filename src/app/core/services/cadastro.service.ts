import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Usuario } from '../types/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  private apiUrl = environment.devAPI;

  constructor(private http: HttpClient) { }

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/usuários`, usuario);
  }

  buscarCadastro(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/usuários/${id}`);
  }

  buscarMeuUsuario(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/usuários/me`);
  }

  listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuários`);
  }

  editarCadastro(usuario: Usuario, userId: string): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.apiUrl}/usuários/${userId}`, usuario);
  }

  excluirCadastro(userId: string) {
    return this.http.delete(`${this.apiUrl}/usuários/${userId}`)
  }
}
