import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
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

  uploadFile(files: File[], directory: string): Observable<any> {
    const formData: FormData = new FormData();
    files.forEach((file) => {
      formData.append('files', file, file.name);
    });
    formData.append('directory', directory);
    return this.http.post(`${this.API}`, formData, {
      responseType: 'text',
    });
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
