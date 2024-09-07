import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../../core/types/usuario';
import { map, Observable, of, tap } from 'rxjs';
import { Filtro } from '../../core/types/filtro';
import { Response } from 'src/app/core/types/response';
import { Payload } from 'src/app/core/types/payload';
import { ListCacheEntry } from 'src/app/core/types/list-cache-entry';
import { PaginationService } from 'src/app/services/pagination.service';
import { PageEvent } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  private API = environment.API_URL;
  private url = this.API + '/usuarios';
  filter = { field: '', operator: '', value: '' };
  cache: ListCacheEntry = {
    list: [],
    firstDoc: null,
    lastDoc: null,
    pageSize: 0,
    totalSize: 0,
  };
  currentPageSize!: number;

  constructor(
    private http: HttpClient,
    private paginationService: PaginationService
  ) {}

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.url}`, usuario);
  }

  buscarCadastro(email: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}/${email}`);
  }

  buscarMeuUsuario(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}/me`);
  }

  clearCache() {
    this.cache = {
      list: [],
      firstDoc: null,
      lastDoc: null,
      pageSize: 0,
      totalSize: 0,
    };
  }

  // TODO: trabalhar lógica para que filtragem de registros funcione com paginação
  getPaginatedData(
    event?: PageEvent,
    filtro?: Filtro
  ): Observable<ListCacheEntry> {
    return this.paginationService
      .getPaginatedData(
        this.cache,
        this.currentPageSize,
        this.url,
        event
      )
      .pipe(
        map((response) => {
          this.currentPageSize = response.pageSize;

          return response;
        })
      );
  }

  fetchUsuariosFromApiForAutoComplete(filtro?: Filtro): Observable<Response> {
    let params = new HttpParams();
    if (filtro) {
      params = params
        .set('field', filtro.field)
        .set('filter', filtro.filter)
        .set('value', filtro.value)
        .set('returnType', 'autoComplete');
    }
    return this.http.get<Response>(`${this.url}`, { params });
  }

  editarCadastro(payload: Payload, userEmail: string): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.url}/${userEmail}`, payload);
  }

  excluirCadastro(userEmail: string) {
    let body = { ids: [userEmail] };
    return this.http.delete(`${this.url}`, { body });
  }
}
