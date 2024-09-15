import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { map, Observable } from 'rxjs';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { ListCacheEntry } from 'src/app/core/types/list-cache-entry';
import { Payload } from 'src/app/core/types/payload';
import { Response } from 'src/app/core/types/response';
import { environment } from 'src/environments/environment';
import { Atendimento } from '../../../core/types/atendimento';
import { Filtro } from '../../../core/types/filtro';

@Injectable({
  providedIn: 'root',
})
export class AtendimentosService {
  private API = environment.API_URL;
  private url = this.API + '/atendimentos';
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
  ) {
    this.paginationService.startCacheCleaner((cache, currentPageSize) => {
      this.cache = cache;
      this.currentPageSize = currentPageSize;
    });
  }


  listagemAtendimentos(filtro?: Filtro): Observable<Response> {
    let params = new HttpParams();
    if (filtro) {
      params = params
        .set('field', filtro.field)
        .set('filter', filtro.filter)
        .set('value', filtro.value);
    }
    return this.http.get<Response>(`${this.url}`, { params });
  }

  getPaginatedData(
    event?: PageEvent,
    filtro?: Filtro
  ): Observable<ListCacheEntry> {
    return this.paginationService
      .getPaginatedData(this.cache, this.currentPageSize, this.url, event)
      .pipe(
        map((response) => {
          this.currentPageSize = response.pageSize;

          return response;
        })
      );
  }

  clearCache() {
    this.cache = this.paginationService.clearCache();
    this.currentPageSize = 0;
  }

  listagemAtendimentoAutocomplete(): Observable<any> {
    let params = new HttpParams().set('returnType', 'autoComplete');
    return this.http.get<Atendimento[]>(`${this.url}`, { params });
  }

  consultaAtendimento(id: string): Observable<Atendimento> {
    return this.http.get<Atendimento>(`${this.url}/${id}`);
  }

  cadastrarAtendimento(atendimento: Atendimento): Observable<Atendimento> {
    return this.http.post<Atendimento>(`${this.url}`, atendimento);
  }

  atualizarAtendimento(payload: Payload, id: string): Observable<Atendimento> {
    return this.http.put<Atendimento>(`${this.url}/${id}`, payload);
  }

  excluirAtendimento(id: string): Observable<Atendimento> {
    let body = { ids: [id] };
    return this.http.delete<Atendimento>(`${this.url}/${id}`, { body });
  }
}
