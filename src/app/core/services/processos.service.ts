import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Processo } from '../types/processo';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProcessosService {

    private API = environment.devAPI;

    constructor(private http: HttpClient) { }
  
    cadastrarProcesso(processo: Processo): Observable<Processo> {
      return this.http.post<Processo>(`${this.API}/processos`, processo);
    }
  
    listarProcessos(): Observable<Processo[]> {
      return this.http.get<Processo[]>(`${this.API}/processos`);
    }
  
    // editar(idParam: string, assistido: Assistido): Observable<Assistido> {
    //   return this.http.put<Assistido>(`${this.API}/assistido/update/${idParam}`, assistido);
    // }
  
    // excluir(idParam: string): Observable<Assistido> {
    //   return this.http.delete<Assistido>(`${this.API}/assistido/delete/${idParam}`);
    //  }
  
    // consultar(idParam: string): Observable<Assistido> {
    //   return this.http.get<Assistido>(`${this.API}/assistido/get/${idParam}`);
    // }

}
