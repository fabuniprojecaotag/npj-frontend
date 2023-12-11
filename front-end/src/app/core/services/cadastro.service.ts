import { UsuarioService } from 'src/app/core/services/usuario.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Usuario } from '../types/usuario';
import { Observable } from 'rxjs';
import { Callback } from '../types/callback';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  private apiUrl = environment.devAPI;

  constructor(private http: HttpClient) { }

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/auth/create`, usuario);
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
}
