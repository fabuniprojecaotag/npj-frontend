import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { map, Observable } from 'rxjs';
import { GenericService } from 'src/app/core/services/generic.service';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { ListCacheEntry } from 'src/app/core/types/list-cache-entry';
import { Response } from 'src/app/core/types/response';
import { AssistidoCivil, AssistidoFull, AssistidoTrabalhista } from '../../../core/types/assistido';

@Injectable({
  providedIn: 'root',
})
export class AssistidosService extends GenericService<AssistidoTrabalhista | AssistidoCivil | AssistidoFull> {
  private url = this.API + '/assistidos';
  // filter = { field: '', operator: '', value: '' };

  constructor(
    protected override http: HttpClient,
    protected override paginationService: PaginationService
  ) {
    super(http, 'assistidos', paginationService);
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
}
