import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../../core/types/usuario';
import { map, Observable, of, tap } from 'rxjs';
import { Filtro } from '../../core/types/filtro';
import { Response } from 'src/app/core/types/response';
import { Payload } from 'src/app/core/types/payload';
import { CacheEntry } from 'src/app/core/types/cache-entry';
// import { cache } from 'src/app/core/types/cache-entry';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  private API = environment.API_URL;
  private url = this.API + '/usuarios';
  filter = { field: '', operator: '', value: '' };
  cache: { [key: string]: CacheEntry } = {};
  currentPageSize!: number;
  incrementPageSize: boolean = false;

  constructor(private http: HttpClient) {}

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.url}`, usuario);
  }

  buscarCadastro(email: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}/${email}`);
  }

  buscarMeuUsuario(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}/me`);
  }

  generateCacheKey(pageSize: number): string {
    return `${pageSize}-${this.filter.field}-${this.filter.operator}-${this.filter.value}`;
  }

  clearCache() {
    this.cache = {};
  }

  fetchUsuariosFromApi(
    pageSize: number,
    filtro?: Filtro
  ): Observable<CacheEntry> {
    this.incrementPageSize = false;
    const lastDoc = this.cache[this.currentPageSize]?.list.at(-1) || null;
    let params = new HttpParams();

    if (filtro) {
      params = params
        .set('field', filtro.field)
        .set('filter', filtro.filter)
        .set('value', filtro.value);
    }

    if (lastDoc != null) {
      params = params.set('startAfter', lastDoc.id);
    }

    if (this.currentPageSize && pageSize - this.currentPageSize > 0) {
      params = params.set('pageSize', pageSize - this.currentPageSize);
      this.incrementPageSize = true;
    } else {
      params = params.set('pageSize', pageSize);
    }

    return this.http.get<CacheEntry>(`${this.url}`, { params }).pipe(
      tap((response) => {
        if (!this.incrementPageSize) {
          // Atualiza o cache com os novos registros
          if (this.cache[pageSize]) {
            this.cache[pageSize].list.push(...response.list);
            this.cache[pageSize].lastDoc = response.lastDoc;
            this.currentPageSize = response.pageSize;
          } else {
            this.cache[pageSize] = response;
            this.currentPageSize = response.pageSize;
          }
        }
      }),
      map((response) => {
        if (this.incrementPageSize) {
          // Retorna o cache modificado quando incrementPageSize for true
          this.cache[pageSize] = this.cache[this.currentPageSize];
          let cachedData = this.cache[pageSize];
          cachedData.list.push(...response.list);
          cachedData.lastDoc = response.lastDoc;
          cachedData.firstDoc = response.firstDoc;
          cachedData.pageSize = pageSize;

          this.currentPageSize = pageSize;

          return cachedData;
        } else {
          // Retorna a resposta original quando incrementPageSize for false
          return response;
        }
      })
    );
  }

  getPaginatedData(pageSize: number, startIndex: number = 0, endIndex: number = 0): Observable<CacheEntry> {
    // Retorna se houver cache
    if (this.cache[pageSize]) {
      const cachedData = this.cache[pageSize];
      const list = cachedData.list.slice(startIndex, endIndex);
      if (list.length >= pageSize || list.length != 0) {
        this.currentPageSize = pageSize;

        let nCache: CacheEntry = {
          list: list,
          firstDoc: list.at(0),
          lastDoc: list.at(-1),
          pageSize: pageSize,
          totalSize: cachedData.totalSize
        };

        return of(nCache); // Retorna dados do cache
      }
    } else if (pageSize < this.currentPageSize) { // Retorna se houver cache também
      let cachedData = this.cache[this.currentPageSize];
      
      let nCache: CacheEntry = {
        list: cachedData.list.slice(0, pageSize),
        firstDoc: cachedData.firstDoc,
        lastDoc: cachedData.list.slice(0, pageSize).at(-1),
        pageSize: pageSize,
        totalSize: cachedData.totalSize
      };
      this.currentPageSize = nCache.pageSize;
      
      let newCache: { [key: string]: CacheEntry } = {};
      newCache[pageSize] = nCache; 
      this.cache[pageSize] = nCache;
      
      return of(newCache[pageSize]);
    } else if (pageSize > this.currentPageSize) { // Retorna se houver cache também
      let cachedData = this.cache[this.currentPageSize] || this.cache[5];

      const list = cachedData.list.slice(startIndex, endIndex);
      if (list.length > this.currentPageSize) {

        this.cache[pageSize] = cachedData;
  
        let nCache: CacheEntry = {
          list: list,
          firstDoc: cachedData.firstDoc,
          lastDoc: list.at(-1),
          pageSize: pageSize,
          totalSize: cachedData.totalSize
        };
  
        return of(nCache);
      }

    }

    // Caso não tenha no cache ou não tenha registros suficientes, faz a requisição
    return this.fetchUsuariosFromApi(pageSize);
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

  editarCadastro(payload: Payload, userEmail: string): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.url}/${userEmail}`, payload);
  }

  excluirCadastro(userEmail: string) {
    let body = { ids: [userEmail] };
    return this.http.delete(`${this.url}`, { body });
  }
}
