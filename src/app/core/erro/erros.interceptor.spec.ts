import { TestBed } from '@angular/core/testing';

import { ErrosInterceptor } from './erros.interceptor';
import { MensagemErroService } from '../services/mensagem-erro.service';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpErrorResponse, HttpHandler, HttpRequest } from '@angular/common/http';
import { throwError } from 'rxjs';

class MockMensagemErroService {
  mostrarMensagemErro(codigoErro: number, mensagemErro: string) {
    console.log('Mock mostrarMensagemErro called with:', codigoErro, mensagemErro);
  }
}

describe(ErrosInterceptor.name, () => {
  let interceptor: ErrosInterceptor;
  let mensagemErroService: MensagemErroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
      providers: [
        ErrosInterceptor,
        { provide: MensagemErroService, useClass: MockMensagemErroService },
        { provide: MatDialog, useValue: {} }
      ]
    });

    interceptor = TestBed.inject(ErrosInterceptor);
    mensagemErroService = TestBed.inject(MensagemErroService);
  });

  it('should be created', () => {
    const interceptor: ErrosInterceptor = TestBed.inject(ErrosInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should handle 401 Unauthorized', () => {
    const errorResponse = new HttpErrorResponse({ status: 401 });

    spyOn(mensagemErroService, 'mostrarMensagemErro');

    const next: HttpHandler = {
      handle: (request: HttpRequest<any>) => {
        return throwError(errorResponse);
      }
    };

    interceptor.intercept(new HttpRequest<any>('GET', '/test'), next).subscribe({
      error: (error: HttpErrorResponse) => {
        expect(mensagemErroService.mostrarMensagemErro).toHaveBeenCalledWith(401, 'Você não tem autorização para acessar este recurso!');
        expect(error.message).toContain('Ops, ocorreu um erro');
      }
    });
  });

  it('should handle ErrorEvent from client', () => {
    const errorResponse = new HttpErrorResponse({ error: new ErrorEvent('TestError', { message: 'Client error message' }) });

    spyOn(mensagemErroService, 'mostrarMensagemErro');

    const next: HttpHandler = {
      handle: (request: HttpRequest<any>) => {
        return throwError(errorResponse);
      }
    };

    interceptor.intercept(new HttpRequest<any>('GET', '/test'), next).subscribe({
      error: (error: HttpErrorResponse) => {
        expect(mensagemErroService.mostrarMensagemErro).toHaveBeenCalledWith(0, 'Erro do cliente: Client error message');
        expect(error.message).toContain('Ops, ocorreu um erro');
      }
    });
  });

  it('should handle 403 Forbidden', () => {
    const errorResponse = new HttpErrorResponse({ status: 403 });

    spyOn(mensagemErroService, 'mostrarMensagemErro');

    const next: HttpHandler = {
      handle: (request: HttpRequest<any>) => {
        return throwError(errorResponse);
      }
    };

    interceptor.intercept(new HttpRequest<any>('GET', '/test'), next).subscribe({
      error: (error: HttpErrorResponse) => {
        expect(mensagemErroService.mostrarMensagemErro).toHaveBeenCalledWith(403, 'Você não tem permissão para acessar este recurso!');
        expect(error.message).toContain('Ops, ocorreu um erro');
      }
    });
  });


  it('should handle 404 Internal Server Error', () => {
    const errorResponse = new HttpErrorResponse({ status: 404, statusText: 'Not Found' });

    spyOn(mensagemErroService, 'mostrarMensagemErro');
    spyOn(console, 'log');

    const next: HttpHandler = {
      handle: (request: HttpRequest<any>) => {
        return throwError(errorResponse);
      }
    };

    const result = interceptor.intercept(new HttpRequest<any>('GET', '/test'), next);

    result.subscribe(
      () => fail('Expected an error, but received a result'),
      (error: HttpErrorResponse) => {
        expect(mensagemErroService.mostrarMensagemErro).toHaveBeenCalledWith(404, 'Recurso não encontrado!');
        expect(error.message).toContain('Ops, ocorreu um erro');
      }
    );
  });

  it('should handle 408 Request Timeout', () => {
    const errorResponse = new HttpErrorResponse({ status: 408 });

    spyOn(mensagemErroService, 'mostrarMensagemErro');

    const next: HttpHandler = {
      handle: (request: HttpRequest<any>) => {
        return throwError(errorResponse);
      }
    };

    interceptor.intercept(new HttpRequest<any>('GET', '/test'), next).subscribe({
      error: (error: HttpErrorResponse) => {
        expect(mensagemErroService.mostrarMensagemErro).toHaveBeenCalledWith(408, 'Servidor demorou muito para responder!');
        expect(error.message).toContain('Ops, ocorreu um erro');
      }
    });
  });

  it('should handle 422 Unprocessable Entity', () => {
    const errorResponse = new HttpErrorResponse({ status: 422, error: { errors: [{ field: 'campo', message: 'mensagem' }] } });

    spyOn(mensagemErroService, 'mostrarMensagemErro');

    const next: HttpHandler = {
      handle: (request: HttpRequest<any>) => {
        return throwError(errorResponse);
      }
    };

    interceptor.intercept(new HttpRequest<any>('GET', '/test'), next).subscribe({
      error: (error: HttpErrorResponse) => {
        expect(mensagemErroService.mostrarMensagemErro).toHaveBeenCalledWith(422, 'Padrão não correspondente ao do servidor!<br>campo: mensagem<br>');
        expect(error.message).toContain('Ops, ocorreu um erro');
      }
    });
  });

  it('should handle 500 Internal Server Error', () => {
    const errorResponse = new HttpErrorResponse({ status: 500 });

    spyOn(mensagemErroService, 'mostrarMensagemErro');

    const next: HttpHandler = {
      handle: (request: HttpRequest<any>) => {
        return throwError(errorResponse);
      }
    };

    interceptor.intercept(new HttpRequest<any>('GET', '/test'), next).subscribe({
      error: (error: HttpErrorResponse) => {
        expect(mensagemErroService.mostrarMensagemErro).toHaveBeenCalledWith(500, 'Erro interno do Servidor!');
        expect(error.message).toContain('Ops, ocorreu um erro');
      }
    });
  });

  it('should handle unknown errors', () => {
    const errorResponse = new HttpErrorResponse({ status: 404 });

    spyOn(mensagemErroService, 'mostrarMensagemErro');

    const next: HttpHandler = {
      handle: (request: HttpRequest<any>) => {
        return throwError(errorResponse);
      }
    };

    interceptor.intercept(new HttpRequest<any>('GET', '/test'), next).subscribe({
      error: (error: HttpErrorResponse) => {
        expect(mensagemErroService.mostrarMensagemErro).toHaveBeenCalledWith(404, 'Recurso não encontrado!');
        expect(error.message).toContain('Ops, ocorreu um erro');
      }
    });
  });
});
