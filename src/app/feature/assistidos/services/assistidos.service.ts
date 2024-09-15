import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AssistidoCivil, AssistidoFull, AssistidoTrabalhista } from '../../../core/types/assistido';
import { Response } from 'src/app/core/types/response';
import { Payload } from 'src/app/core/types/payload';
import { ListCacheEntry } from 'src/app/core/types/list-cache-entry';
import { Filtro } from 'src/app/core/types/filtro';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { PageEvent } from '@angular/material/paginator';
import { GenericService } from 'src/app/core/services/generic.service';

@Injectable({
  providedIn: 'root',
})
export class AssistidosService extends GenericService<AssistidoTrabalhista | AssistidoCivil | AssistidoFull> {
  private url = this.API + '/assistidos';
  // filter = { field: '', operator: '', value: '' };
  cache: ListCacheEntry = {
    list: [],
    firstDoc: null,
    lastDoc: null,
    pageSize: 0,
    totalSize: 0,
  };
  currentPageSize!: number;

  constructor(
    protected override http: HttpClient,
    private paginationService: PaginationService
  ) {
    super(http, 'assistidos');
    this.paginationService.startCacheCleaner((cache, currentPageSize) => {
      this.cache = cache;
      this.currentPageSize = currentPageSize;
    });
  }

  getPaginatedData(
    event?: PageEvent,
    // filtro?: Filtro
  ): Observable<ListCacheEntry> {
    return this.paginationService
      .getPaginatedData(
        this.cache,
        this.currentPageSize,
        this.url,
        event,
        'assistido'
      )
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

  listarAssistidosForAutoComplete(): Observable<Response> {
    let params = new HttpParams().set('returnType', 'autoComplete');
    return this.http.get<Response>(`${this.url}`, { params });
  }

  listarAtendimentosVinculados(id: string): Observable<Response> {
    let params = new HttpParams().set('returnType', 'forAssistido');
    return this.http.get<Response>(`${this.url}/${id}/atendimentos`, {
      params,
    });
  }

  editarAssistido(
    id: string,
    payload: Payload
  ): Observable<AssistidoTrabalhista | AssistidoCivil | AssistidoFull> {
    return this.http.put<AssistidoTrabalhista | AssistidoCivil | AssistidoFull>(
      `${this.url}/${id}`,
      payload
    );
  }
}
