import { UsuarioService } from 'src/app/core/services/usuario.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Usuario } from '../types/usuario';
import { Observable } from 'rxjs';
import { Assistido } from '../types/assistido';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  private apiUrl = environment.devAPI;

  constructor(private http: HttpClient, private usuarioService: UsuarioService) { }

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/user/create`, usuario);
  }

  cadastrarAssistido(assistido: Assistido): Observable<Assistido> {
    return this.http.post<Assistido>(`${this.apiUrl}/assistido/create`, assistido);
  }

  buscarCadastro(): Observable<Usuario> {
    var perfilId;
    perfilId = this.usuarioService.retornarUsuario().subscribe({
      next: (response) => {
        perfilId = response?.perfil_id;
      }
    })
    return this.http.get<Usuario>(`${this.apiUrl}/perfil/${perfilId}`);
  }

  editarCadastro(usuario: Usuario ): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.apiUrl}/perfil`, usuario);
  }
}
