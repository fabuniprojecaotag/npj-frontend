import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Filtro } from 'src/app/core/types/filtro';
import { ListCacheEntry } from 'src/app/core/types/list-cache-entry';
import { Medida } from 'src/app/core/types/medida';
import { Payload } from 'src/app/core/types/payload';
import { PaginationService } from 'src/app/services/pagination.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MedidasService {
  private API = environment.API_URL;
  private url = this.API + '/medidas juridicas';
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

  getPaginatedData(
    pageSize: number,
    startIndex: number = 0,
    endIndex: number = 0,
    filtro?: Filtro
  ): Observable<ListCacheEntry> {
    return this.paginationService
      .getPaginatedData(
        pageSize,
        startIndex,
        endIndex,
        this.cache,
        this.currentPageSize,
        this.url
      )
      .pipe(
        map((response) => {
          this.currentPageSize = response.pageSize;

          return response;
        })
      );
  }
  cadastrarMedida(medida: Medida): Observable<Medida> {
    return this.http.post<Medida>(`${this.url}`, medida);
  }

  consultarMedida(id: string): Observable<Medida> {
    return this.http.get<Medida>(`${this.url}/${id}`);
  }

  atualizarMedida(id: string, payload: Payload): Observable<Medida> {
    return this.http.put<Medida>(`${this.url}/${id}`, payload);
  }

  excluirMedida(id: string): Observable<Medida> {
    let body = { ids: [id] };
    return this.http.delete<Medida>(`${this.url}`, { body });
  }
}
