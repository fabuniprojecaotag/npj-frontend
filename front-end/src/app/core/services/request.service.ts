import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as devEnv } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private apiUrl = devEnv.devAPI;
  private authTokenKey = 'authToken';
  private authToken: string | null;

  constructor(private http: HttpClient) {
    // Retrieve the token from localStorage on service initialization
    this.authToken = localStorage.getItem(this.authTokenKey);
  }

  private saveAuthToken(token: string): void {
    // Save the token to both the service property and localStorage
    this.authToken = token;
    localStorage.setItem(this.authTokenKey, token);
  }

  public logar(endpoint: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // If there is a stored token, include it in the headers
    if (this.authToken) {
      headers.set('Authorization', `Bearer ${this.authToken}`);
    }

    const req = this.http.post(url, data, { headers });

    // Handle the response to extract and save the token
    req.subscribe(
      (response: any) => {
        if (response && response.token) {
          this.saveAuthToken(response.token);
        }
      },
      (error: any) => {
        console.error('Error during authentication:', error);
      }
    );

    return req;
  }

  public get(endpoint: string): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`,
    });
    return this.http.get(url, { headers });
  }

  public post(endpoint: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, data, { headers });
  }

  public createSendingLog(func: string, method: string, params: any) {
    console.group('%cRequest Details:', 'color: yellow; font-weight: bold');
    console.log('%c----------------', 'color: yellow; font-weight: bold');
    console.log('%cFunction: %c' + func, 'color: yellow', 'color: orange');
    console.log('%cURL: %c' + this.apiUrl, 'color: yellow', 'color: orange');
    console.log(
      '%cType of Request:%c' + method,
      'color: yellow',
      'color: orange'
    );
    console.log('%c', 'color: yellow'); // Empty line for spacing
    console.log('%cSent Parameters:', 'color: yellow; font-weight: bold');
    console.log('%c----------------', 'color: yellow; font-weight: bold');
    console.log('%c' + JSON.stringify(params, null, 4), 'color: yellow');
    console.groupEnd();
  }
}
