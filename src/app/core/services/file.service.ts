import { HttpClient, HttpEvent, HttpEventType, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from '../types/response';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private API = environment.API_URL + '/storage';

  constructor(private http: HttpClient) {}

  downloadFile(fileName: string, directory: string) {
    return this.http.get(`${this.API}/${fileName}`, {
      params: { directory: directory },
      responseType: 'blob',
    });
  }

  uploadFiles(files: File[], directory: string): Observable<any> {
    const formData: FormData = new FormData();
    files.forEach((file) => {
      formData.append('files', file, file.name);
    });
    formData.append('directory', directory);
    return this.http
      .post(`${this.API}`, formData, {
        responseType: 'text',
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        map((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              return Math.round((100 * event.loaded) / (event.total || 1)); // Retorna progresso como porcentagem
            case HttpEventType.Response:
              return 100; // Quando o upload terminar, retorna 100%
            default:
              return 0;
          }
        })
      );
  }

  listFiles(directory: string): Observable<Response> {
    const params = new HttpParams().set('directory', directory);
    return this.http.get<Response>(this.API, { params });
  }

  deleteFile(fileName: string, directory: string): Observable<void> {
    return this.http
      .delete<void>(`${this.API}/${fileName}`, {
        params: { directory: directory },
      })
      .pipe(
        catchError((error) => {
          console.error('Erro ao excluir arquivo no serviço: ', error);
          return throwError(() => error); // Propaga o erro
        })
      );
  }
}
