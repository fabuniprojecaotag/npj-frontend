import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Perfil } from '../types/usuario';

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  private apiUrl: string = environment.devAPI;

  constructor(private http: HttpClient) { }

  listar(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(`${this.apiUrl}/perfil/all`);
  }

  consultar(perfilDocumentId: string): Observable<Perfil> {
    return this.http.get<Perfil>(`${this.apiUrl}/perfil/get/${perfilDocumentId}`);
  }
}
