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
    return this.http.post<Usuario>(`${this.apiUrl}/user/create`, usuario);
  }
}
