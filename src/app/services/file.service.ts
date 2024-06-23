import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private API = environment.API_URL;

  constructor(private http: HttpClient) { }

  downloadFile(fileName: string) {
    return this.http.get(`${this.API}/storage/${fileName}`, {
      responseType: 'blob'
    });
  }

  uploadFile(files: File[]): Observable<any> {
    const formData: FormData = new FormData();
    files.forEach(file => {
      formData.append('files', file, file.name);
    });
    return this.http.post(`${this.API}/storage`, formData, {
      responseType: 'text'
    });
  }
}
