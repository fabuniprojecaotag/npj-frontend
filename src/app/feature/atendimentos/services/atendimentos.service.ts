import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { map, Observable } from 'rxjs';
import { GenericService } from 'src/app/core/services/generic.service';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { ListCacheEntry } from 'src/app/core/types/list-cache-entry';
import { Response } from 'src/app/core/types/response';
import { Atendimento } from '../../../core/types/atendimento';
import { Filtro } from '../../../core/types/filtro';

@Injectable({
  providedIn: 'root',
})
export class AtendimentosService extends GenericService<Atendimento> {
  private url = this.API + '/atendimentos';
  filter = { field: '', operator: '', value: '' };

  constructor(
    protected override http: HttpClient,
    protected override paginationService: PaginationService
  ) {
    super(http, 'atendimentos', paginationService);
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

  listagemAtendimentoAutocomplete(): Observable<any> {
    let params = new HttpParams().set('returnType', 'autoComplete');
    return this.http.get<Atendimento[]>(`${this.url}`, { params });
  }
}
