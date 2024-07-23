import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medida } from 'src/app/core/types/medida';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedidasService {
  private API = environment.API_URL;

  constructor(private http: HttpClient) { }

  listagemMedidas(): Observable<Medida[]> {
    return this.http.get<Medida[]>(`${this.API}/medidas-juridicas`);
  }
}
