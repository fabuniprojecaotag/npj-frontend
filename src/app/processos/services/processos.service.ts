import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Processo } from '../../core/types/processo';
import { Payload } from 'src/app/core/types/payload';
import { PaginationService } from 'src/app/services/pagination.service';
import { Filtro } from 'src/app/core/types/filtro';
import { ListCacheEntry } from 'src/app/core/types/list-cache-entry';
import { PageEvent } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root',
})
export class ProcessosService {
  private API = environment.API_URL;
  private url = this.API + '/processos';
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


  cadastraProcesso(processo: Processo): Observable<Processo> {
    return this.http.post<Processo>(`${this.url}`, processo);
  }

  getPaginatedData(
    event?: PageEvent,
    filtro?: Filtro
  ): Observable<ListCacheEntry> {
    return this.paginationService
      .getPaginatedData(
        this.cache,
        this.currentPageSize,
        this.url,
        event,
        'processo'
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

  consultarProcesso(id: string): Observable<Processo> {
    return this.http.get<Processo>(`${this.url}/${id}`);
  }

  editarProcesso(id: string, payload: Payload): Observable<Processo> {
    return this.http.put<Processo>(`${this.url}/${id}`, payload);
  }

  excluirProcesso(id: string): Observable<Processo> {
    let body = { ids: [id] };
    return this.http.delete<Processo>(`${this.url}`, { body });
  }
}
