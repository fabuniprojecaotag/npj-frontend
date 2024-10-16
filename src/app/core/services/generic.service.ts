import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrudService } from '../types/crud-service';
import { Payload } from '../types/payload';
import { ListCacheEntry } from '../types/list-cache-entry';
import { PaginationService } from './pagination.service';
import { PageEvent } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export abstract class GenericService<T> implements CrudService<T> {
  protected API = environment.API_URL;
  protected cache: ListCacheEntry<T | null>= {
    list: [],
    firstDoc: null,
    lastDoc: null,
    pageSize: 0,
    totalSize: 0,
  };
  currentPageSize!: number;

  constructor(
    protected http: HttpClient,
    protected endPoint: string,
    protected paginationService: PaginationService
  ) {
    this.paginationService.startCacheCleaner((cache, currentPageSize) => {
      this.cache = cache;
      this.currentPageSize = currentPageSize;
    });
  }

  clearCache() {
    this.cache = this.paginationService.clearCache();
    this.currentPageSize = 0;
  }

  getById(id: any): Observable<T> {
    return this.http.get<T>(`${this.API}/${this.endPoint}/${id}`)
      .pipe(take(1));
  }

  getAllPaginated(
    event?: PageEvent,
    // filtro?: Filtro
  ): Observable<ListCacheEntry<T>> {
    return this.paginationService
      .getPaginatedData(
        this.cache,
        this.currentPageSize,
        `${this.API}/${this.endPoint}`,
        event,
        this.endPoint
      )
      .pipe(
        map((response) => {
          this.currentPageSize = response.pageSize;

          return response;
        })
      );
  }


  save(data: T): Observable<T> {
    return this.http.post<T>(`${this.API}/${this.endPoint}`, data)
      .pipe(take(1));
  }

  update(id: string | number, data: T | Payload): Observable<T> {
    return this.http.put<T>(`${this.API}/${this.endPoint}/${id}`, data)
      .pipe(take(1));
  }

  delete(id: string | number): Observable<T> {
    let body = { ids: [id] };
    return this.http.delete<T>(`${this.API}/${this.endPoint}`, { body })
      .pipe(take(1));
  }
}
