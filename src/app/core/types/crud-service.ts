import { Observable } from 'rxjs';

export interface CrudService<T> {
  // getAll(page: string, search?: string): Observable<T>;
  getById(id: string | number): Observable<T>;
  save(data: T): Observable<T>;
  update(id: string | number, data: T): Observable<T>;
  delete(id: string | number): Observable<T>;
}
