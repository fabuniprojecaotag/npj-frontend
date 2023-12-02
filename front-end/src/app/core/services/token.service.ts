import { Injectable } from '@angular/core';

const KEY: string = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  salvarToken(token: string) {
    return localStorage.setItem(KEY, token);
  }

  excluirToken() {
    return localStorage.removeItem(KEY);
  }

  retornarToken() {
    return localStorage.getItem(KEY) ?? '';
  }

  possuiToken() {
    return !!this.retornarToken()
  }
}
