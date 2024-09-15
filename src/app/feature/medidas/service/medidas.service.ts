import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { map, Observable } from 'rxjs';
import { GenericService } from 'src/app/core/services/generic.service';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { Filtro } from 'src/app/core/types/filtro';
import { ListCacheEntry } from 'src/app/core/types/list-cache-entry';
import { Medida } from 'src/app/core/types/medida';

@Injectable({
  providedIn: 'root',
})
export class MedidasService extends GenericService<Medida> {
  private url = this.API + '/medidas juridicas';
  filter = { field: '', operator: '', value: '' };

  constructor(
    protected override http: HttpClient,
    protected override paginationService: PaginationService
  ) {
    super(http, 'medidas juridicas', paginationService)
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
}
