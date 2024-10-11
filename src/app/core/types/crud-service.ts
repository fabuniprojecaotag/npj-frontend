import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { ListCacheEntry } from './list-cache-entry';

export interface CrudService<T> {
  getAllPaginated(event: PageEvent | undefined, filtro: T): Observable<ListCacheEntry<T>>;
  getById(id: string | number): Observable<T>;
  save(data: T): Observable<T>;
  update(id: string | number, data: T): Observable<T>;
  delete(id: string | number): Observable<T>;
}
