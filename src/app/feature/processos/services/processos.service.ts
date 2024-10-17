import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { map, Observable } from 'rxjs';
import { GenericService } from 'src/app/core/services/generic.service';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { Filtro } from 'src/app/core/types/filtro';
import { ListCacheEntry } from 'src/app/core/types/list-cache-entry';
import { Processo } from '../../../core/types/processo';
import { ListResponse } from 'src/app/core/types/ListResponse';


@Injectable({
  providedIn: 'root',
})
export class ProcessosService extends GenericService<Processo> {
  private url = `${this.API}/assistidos`; // O erro estava aqui...
  filter = { field: '', operator: '', value: '' };

  constructor(
    protected override http: HttpClient,
    protected override paginationService: PaginationService
  ) {
    super(http, 'processos', paginationService);
  }

  // método para listar os processos vinculados
  listarProcessos(id: string): Observable<ListResponse<Processo>>{
    const params = new HttpParams().set('returnType', 'forAssistido');
    return this.http.get<ListResponse<Processo>>(`${this.url}/${id}/processos`, {params});
  }

}
