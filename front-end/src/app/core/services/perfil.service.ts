import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Perfil } from '../types/usuario';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl: string = environment.devAPI;
  private cache$?: Observable<Perfil[]>;

  constructor(private http: HttpClient) { }

  listar(): Observable<Perfil[]> {
    if (!this.cache$) {
      this.cache$ = this.requestPerfis().pipe(
        shareReplay(1)
      )
    }
    return this.cache$;
  }

  private requestPerfis(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(`${this.apiUrl}/perfil/all`);
  }
}
