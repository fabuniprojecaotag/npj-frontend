import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Assistido,
  AssistidoCivil,
  AssistidoFull,
  AssistidoTrabalhista,
} from '../../core/types/assistido';
import { Response } from 'src/app/core/types/response';
import { Payload } from 'src/app/core/types/payload';
import { ListCacheEntry } from 'src/app/core/types/list-cache-entry';
import { Filtro } from 'src/app/core/types/filtro';
import { PaginationService } from 'src/app/services/pagination.service';
import { PageEvent } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root',
})
export class AssistidosService {
  private API = environment.API_URL;
  private url = this.API + '/assistidos';
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

  cadastrarAssistido(
    assistido: Assistido
  ): Observable<AssistidoTrabalhista | AssistidoCivil | AssistidoFull> {
    return this.http.post<
      AssistidoTrabalhista | AssistidoCivil | AssistidoFull
    >(`${this.url}`, assistido);
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
        "assistido"
      )
      .pipe(
        map((response) => {
          this.currentPageSize = response.pageSize;

          return response;
        })
      );
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

  excluirAssistido(
    id: string
  ): Observable<AssistidoFull | AssistidoCivil | AssistidoTrabalhista> {
    let body = { ids: [id] };
    return this.http.delete<
      AssistidoFull | AssistidoCivil | AssistidoTrabalhista
    >(`${this.url}`, { body });
  }

  consultarAssistido(
    id: string
  ): Observable<AssistidoFull | AssistidoCivil | AssistidoTrabalhista> {
    return this.http.get<AssistidoFull | AssistidoCivil | AssistidoTrabalhista>(
      `${this.url}/${id}`
    );
  }
}
