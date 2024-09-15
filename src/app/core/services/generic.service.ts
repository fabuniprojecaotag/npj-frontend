import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrudService } from '../types/crud-service';
import { Payload } from '../types/payload';

@Injectable({
  providedIn: 'root'
})
export abstract class GenericService<T> implements CrudService<T> {
  protected API = environment.API_URL;

  constructor(protected http: HttpClient, protected endPoint: string) { }

  getById(id: any): Observable<T> {
    return this.http.get<T>(`${this.API}/${this.endPoint}/${id}`)
      .pipe(take(1));
  }

  // getAll(page: string, search?: string): Observable<T> {
  //   const params = new HttpParams()
  //     .set('page', page)
  //     .set('payload', JSON.stringify(search || {}));

  //   return this.http.get<T>(`${this.API}/${this.endPoint}`, { params })
  //     .pipe(take(1));
  // }


  save(data: T): Observable<T> {
    return this.http.post<T>(`${this.API}/${this.endPoint}`, data)
      .pipe(take(1));
  }

  update(id: string | number, data: T | Payload): Observable<T> {
    return this.http.put<T>(`${this.API}/${this.endPoint}/${id}`, data)
      .pipe(take(1));
  }

  delete(id: string | number): Observable<T> {
    let body = { ids: [id] };
    return this.http.delete<T>(`${this.API}/${this.endPoint}`, { body })
      .pipe(take(1));
  }
}
