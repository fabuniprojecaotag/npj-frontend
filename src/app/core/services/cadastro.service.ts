import { HttpClient, HttpParams } from '@angular/common/http';
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

  buscarCadastro(email: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/usuários/${email}`);
  }

  buscarMeuUsuario(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/usuários/me`);
  }

  listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuários`);
  }

  editarCadastro(usuario: Usuario, userEmail: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/usuários/${userEmail}`, usuario);
  }

  excluirCadastro(userEmail: string) {
    return this.http.delete(`${this.apiUrl}/usuários/${userEmail}`)
  }
}
