import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { map, Observable } from 'rxjs';
import { GenericService } from 'src/app/core/services/generic.service';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { ListCacheEntry } from 'src/app/core/types/list-cache-entry';
import { Response } from 'src/app/core/types/response';
import { Filtro } from '../../../core/types/filtro';
import { Usuario } from '../../../core/types/usuario';

@Injectable({
  providedIn: 'root',
})
export class CadastroService extends GenericService<Usuario> {
  private url = this.API + '/usuarios';
  filter = { field: '', operator: '', value: '' };

  constructor(
    protected override http: HttpClient,
    protected override paginationService: PaginationService
  ) {
    super(http, 'usuarios', paginationService)
  }

  buscarMeuUsuario(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}/me`);
  }

  fetchUsuariosFromApiForAutoComplete(filtro?: Filtro): Observable<Response> {
    let params = new HttpParams();
    if (filtro) {
      params = params
        .set('field', filtro.field)
        .set('filter', filtro.filter)
        .set('value', filtro.value)
        .set('returnType', 'autoComplete');
    }
    return this.http.get<Response>(`${this.url}`, { params });
  }
}
