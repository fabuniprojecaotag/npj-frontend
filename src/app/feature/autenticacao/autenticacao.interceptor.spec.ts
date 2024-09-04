import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { AutenticacaoInterceptor } from './autenticacao.interceptor';
import { TokenService } from './services/token.service';

describe(AutenticacaoInterceptor.name, () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TokenService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AutenticacaoInterceptor,
          multi: true,
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add Authorization header with Bearer token when token is present', inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, mock: HttpTestingController) => {
      spyOn(tokenService, 'possuiToken').and.returnValue(true);
      spyOn(tokenService, 'retornarToken').and.returnValue('mocked_token');

      // Faz uma requisição usando o HttpClient com um endpoint esperado
      http.get('/assistidos').subscribe(response => {
        expect(response).toBeTruthy();
      });

      // Espera-se que tenha sido feita exatamente uma requisição para '/assistidos'
      const req = httpMock.expectOne('/assistidos');
      expect(req.request.headers.get('Authorization')).toEqual('Bearer mocked_token');
      expect(req.request.headers.get('Content-Type')).toEqual('application/json');

      req.flush({}); // Simula uma resposta vazia

      mock.verify(); // Verifica se não há requisições pendentes
    }
  ));
});
