import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as devEnv } from 'src/environments/environment.development';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private apiUrl = devEnv.devAPI;
  private authToken: string | null;

  constructor(private http: HttpClient, private tokenService: TokenService) {
    // Retrieve the token from localStorage on service initialization
    this.authToken = this.tokenService.retornarToken();
  }

  public logar(endpoint: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const req = this.http.post(url, JSON.stringify(data), { headers });
    console.log('AQUI URL');
    console.log(req);

    // Handle the response to extract and save the token
    req.subscribe({
      next: (resposta: any) => {
        if (resposta && resposta.token) {
          this.tokenService.salvarToken(resposta.token);
        }
      },
      error: (error: any) => {
        console.log('erro durante a autenticação:', error);
      },
    });

    return req;
  }

  public get(endpoint: string): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;

    return this.http.get(url);
  }

  public post(endpoint: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;

    return this.http.post(url, data);
  }

  // public createSendingLog(func: string, method: string, params: any) {
  //   console.group('%cRequest Details:', 'color: yellow; font-weight: bold');
  //   console.log('%c----------------', 'color: yellow; font-weight: bold');
  //   console.log('%cFunction: %c' + func, 'color: yellow', 'color: orange');
  //   console.log('%cURL: %c' + this.apiUrl, 'color: yellow', 'color: orange');
  //   console.log(
  //     '%cType of Request:%c' + method,
  //     'color: yellow',
  //     'color: orange'
  //   );
  //   console.log('%c', 'color: yellow'); // Empty line for spacing
  //   console.log('%cSent Parameters:', 'color: yellow; font-weight: bold');
  //   console.log('%c----------------', 'color: yellow; font-weight: bold');
  //   console.log('%c' + JSON.stringify(params, null, 4), 'color: yellow');
  //   console.groupEnd();
  // }
}
