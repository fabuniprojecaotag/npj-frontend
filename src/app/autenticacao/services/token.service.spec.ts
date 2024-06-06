import { TestBed } from '@angular/core/testing';
import { TokenService } from './token.service';

function createValidToken(exp: number): string {
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = { exp: exp };
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));
  return `${encodedHeader}.${encodedPayload}.signature`;
}

describe(TokenService.name, () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);

    // Mock de localStorage
    let store: { [key: string]: string } = {};

    spyOn(localStorage, 'getItem').and.callFake((key: string): string => {
      return store[key] || '';
    });

    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      store[key] = value;
    });

    spyOn(localStorage, 'removeItem').and.callFake((key: string) => {
      delete store[key];
    });

    spyOn(localStorage, 'clear').and.callFake(() => {
      store = {};
    });
  });

  it(`#${TokenService.name} should be created`, () => {
    expect(service).toBeTruthy();
  });

  it(`#${TokenService.prototype.retornarToken.name} should return a token`, () => {
    const token = 'my-token';
    service.salvarToken(token);
    expect(service.retornarToken()).toEqual(token);
  });

  it(`#${TokenService.prototype.excluirToken.name} should delete a token`, () => {
    const token = 'my-token';
    service.salvarToken(token);
    service.excluirToken();
    expect(service.retornarToken()).toBe('');
  });

  it(`#${TokenService.prototype.possuiToken.name} should return true when a token is present`, () => {
    const validToken = createValidToken(Date.now() / 1000 + 3600); // Expira em 1 hora
    service.salvarToken(validToken);
    expect(service.possuiToken()).toBeTrue();
  });

  it(`#${TokenService.prototype.possuiToken.name} should return false when no token is present`, () => {
    service.excluirToken();
    expect(service.possuiToken()).toBeFalse();
  });

  it(`#${TokenService.prototype.salvarToken.name} should save a token`, () => {
    const token = 'my-token';
    service.salvarToken(token);
    expect(service.retornarToken()).toEqual(token);
  });
});
