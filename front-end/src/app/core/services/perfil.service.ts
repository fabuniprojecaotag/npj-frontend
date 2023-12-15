import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Callback } from '../types/callback';

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  private apiUrl: string = environment.devAPI;

  constructor(private http: HttpClient) {}

   listar(): Observable<Callback> {
    return this.http.get<Callback>(`${this.apiUrl}/perfil/all`);
  }

  consultar(perfilId: string): Observable<Callback> {
    return this.http.get<Callback>(`${this.apiUrl}/perfil/${perfilId}`);
  }
}
