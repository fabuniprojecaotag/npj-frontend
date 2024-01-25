import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';

describe(TokenService.name, () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);
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
    expect(service.retornarToken()).toBeFalsy();
});

  it(`#${TokenService.prototype.possuiToken.name} should return true when a token is present`, () => {
    const token = 'my-token';
    service.salvarToken(token);
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
