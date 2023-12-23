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
    return this.http.post<Usuario>(`${this.apiUrl}/auth/register`, usuario);
  }

  buscarCadastro(id: string): Observable<any> {

    return this.http.get<any>(`${this.apiUrl}/auth/get/${id}`);
  }

  editarCadastro(usuario: Usuario ): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.apiUrl}/auth/update`, usuario);
  }

  listar() {
    return this.http.get(`${this.apiUrl}/auth/list`);
  }

  excluirCadastro(userId: string) {
    return this.http.delete(`${this.apiUrl}/auth/delete/${userId}`)
  }
}
