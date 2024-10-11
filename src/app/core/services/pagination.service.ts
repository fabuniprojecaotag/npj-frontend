import { Injectable } from '@angular/core';
import { Filtro } from '../types/filtro';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { ListCacheEntry } from '../types/list-cache-entry';
import { PageEvent } from '@angular/material/paginator';
import { DEFAULT_PAGE_SIZE, TEN_MINUTES_IN_MILLISECONDS } from '../../shared/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  constructor(private http: HttpClient) {}

  // TODO: trabalhar lógica para que filtragem de registros funcione com paginação
  getPaginatedData(
    cache: ListCacheEntry<any>,
    currentPageSize: number,
    url: string,
    event?: PageEvent,
    entity?: string,
    filtro?: Filtro
  ): Observable<ListCacheEntry<any>> {
    const pageSize = event?.pageSize || DEFAULT_PAGE_SIZE;
    const pageIndex = event?.pageIndex || 0;

    // Calcula índices baseados no tamanho da página e no índice atual
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;

    // Extrai o cache.list para reuso
    const listCache = cache.list;

    // Mantém sincronizado o `pageSize` do cache assim como deve ocorrer com o `currentPageSize` passado
    cache.pageSize = pageSize;

    // Verifica se deve retornar cache para à mudança de índice de página efetuada pelo usuário
    if (pageSize == currentPageSize) {
      const list = listCache.slice(startIndex, endIndex);
      const areThereAnyRecords = list.length != 0;

      // Retorna o cache se houver algum registro
      if (areThereAnyRecords) {
        let nCache: ListCacheEntry<any> = {
          list: list,
          firstDoc: list.at(0),
          lastDoc: list.at(-1),
          pageSize: pageSize,
          totalSize: cache.totalSize,
        };

        return of(nCache);
      }
    }

    // Retorna o cache paginado em menor quantidade
    else if (pageSize < currentPageSize) {
      let nCache: ListCacheEntry<any> = {
        list: listCache.slice(startIndex, endIndex),
        firstDoc: cache.firstDoc,
        lastDoc: listCache.slice(startIndex, endIndex).at(-1),
        pageSize: pageSize,
        totalSize: cache.totalSize,
      };

      return of(nCache);
    }

    // Retorna o cache paginado em maior quantidade
    else if (pageSize > currentPageSize) {
      const list = listCache.slice(startIndex, endIndex);

      const thereAreAllTheDatabaseRecordsLocally =
        cache.list.length == cache.totalSize;

      // Verifica se a quantidade é grande o suficiente ou se todos os registros foram armazenados do banco para retornar o cache
      if (
        list.length > currentPageSize ||
        thereAreAllTheDatabaseRecordsLocally
      ) {
        let nCache: ListCacheEntry<any> = {
          list: list,
          firstDoc: cache.firstDoc,
          lastDoc: list.at(-1),
          pageSize: pageSize,
          totalSize: cache.totalSize,
        };

        return of(nCache);
      }
    }

    // Caso não tenha no cache ou não tenha registros suficientes, faz a requisição; e sobreescreve o cache passado como arg.
    return this.fetchApi(url, pageSize, currentPageSize, cache, entity).pipe(
      map((response) => {
        // Como o argumento `cache` não fica limitado a este escopo, então 'automaticamente' o objeto `cache` passado pelo outro service é sobreescrito
        cache.lastDoc = response.lastDoc;
        cache.list.push(...response.list);
        cache.pageSize = response.pageSize;
        cache.totalSize = response.totalSize;

        const isInitialPage = endIndex == 0;
        const listForReturn = isInitialPage
          ? cache.list
          : cache.list.slice(startIndex, endIndex);

        // Cria uma nova estrutura de cache local para retornar apenas os registros especificados
        let nCache: ListCacheEntry<any> = {
          list: listForReturn,
          firstDoc: cache.firstDoc,
          lastDoc: cache.lastDoc,
          pageSize: pageSize,
          totalSize: cache.totalSize,
        };

        return nCache;
      })
    );
  }

  private fetchApi(
    url: string,
    pageSize: number,
    currentPageSize: number,
    cache: ListCacheEntry<any>,
    entity?: string,
    filtro?: Filtro
  ): Observable<ListCacheEntry<any>> {
    const lastDoc = cache.lastDoc;

    let params = new HttpParams();

    if (filtro) {
      params = params
        .set('field', filtro.field)
        .set('filter', filtro.filter)
        .set('value', filtro.value);
    }

    if (lastDoc != null && lastDoc != 'Not available') {
      switch (entity) {
        case 'assistido':
          params = params.set('startAfter', lastDoc.cpf);
          break;
        case 'processo':
          params = params.set('startAfter', lastDoc.numero);
          break;
        default:
          params = params.set('startAfter', lastDoc.id);
      }
    }

    let incrementPageSize = currentPageSize && pageSize - currentPageSize > 0;

    if (incrementPageSize)
      params = params.set('pageSize', pageSize - currentPageSize);
    else params = params.set('pageSize', pageSize);

    return this.http.get<ListCacheEntry<any>>(`${url}`, { params });
  }

  clearCache(): ListCacheEntry<any> {
    return {
      list: [],
      firstDoc: null,
      lastDoc: null,
      pageSize: DEFAULT_PAGE_SIZE,
      totalSize: -1, // O valor tem que ser diferente de zero para não conflitar com uma lógica definida na PaginationService
    };
  }

  startCacheCleaner(callback: (cache: ListCacheEntry<any>, currentPageSize: number) => void, intervalTime: number = TEN_MINUTES_IN_MILLISECONDS) {
    setInterval(() => {
      const clearedCache = this.clearCache();
      callback(clearedCache, 0);
    }, intervalTime);
  }
}
