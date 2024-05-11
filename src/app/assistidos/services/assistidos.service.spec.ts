import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AssistidosService, AssistidoFull } from './assistidos.service';

describe('AssistidosService', () => {
  let service: AssistidosService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AssistidosService]
    });

    service = TestBed.inject(AssistidosService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  const mockAssistidoGenerico: AssistidoFull = {
    nome: 'Fulano de Teste',
    rg: '1234567',
    endereco: {
      residencial: {
        logradouro: 'Rua Principal',
        bairro: 'Centro',
        numero: '123',
        complemento: 'Ap. 101',
        cep: '12345-678',
        cidade: 'Cidade Exemplo'
      }
    },
    filiacao: {
      pai: 'Teste Pai',
      mae: 'Teste Mãe'
    },
    ctps: {
      numero: '123456',
      serie: '789',
      uf: 'SP'
    },
    pis: '12345678900',
    empregadoAtualmente: true
  };

  it('#should retrieve assistidos from the API via GET', () => {
    const mockAssistidos: AssistidoFull[] = [mockAssistidoGenerico];

    service.listarAssistidos().subscribe(assistidos => {
      expect(assistidos.length).toBe(1);
      expect(assistidos).toEqual(mockAssistidos);
    });

    const req = httpTestingController.expectOne(`${service.getApiUrl()}/assistidos`);
    expect(req.request.method).toBe('GET');
    req.flush(mockAssistidos);
  });

  it('#should add a new assistido to the API via POST', () => {
    service.cadastrarAssistido(mockAssistidoGenerico).subscribe(assistido => {
      expect(assistido).toEqual(mockAssistidoGenerico);
    });

    const req = httpTestingController.expectOne(`${service.getApiUrl()}/assistidos`);
    expect(req.request.method).toBe('POST');
    req.flush(mockAssistidoGenerico);
  });

  it('#should edit an existing assistido via PUT', () => {
    service.editar(mockAssistidoGenerico.rg, mockAssistidoGenerico).subscribe(assistido => {
      expect(assistido).toEqual(mockAssistidoGenerico);
    });

    const req = httpTestingController.expectOne(`${service.getApiUrl()}/assistidos/${mockAssistidoGenerico.rg}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockAssistidoGenerico);
  });

  it('#should delete an existing assistido via DELETE', () => {
    service.excluir(mockAssistidoGenerico.rg).subscribe(assistido => {
      expect(assistido).toEqual(mockAssistidoGenerico);
    });

    const req = httpTestingController.expectOne(`${service.getApiUrl()}/assistidos/${mockAssistidoGenerico.rg}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockAssistidoGenerico);
  });

  it('#should retrieve an existing assistido via GET', () => {
  service.consultar(mockAssistidoGenerico.rg).subscribe(assistido => {
      expect(assistido).toEqual(mockAssistidoGenerico);
    });

    const req = httpTestingController.expectOne(`${service.getApiUrl()}/assistidos/${mockAssistidoGenerico.rg}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockAssistidoGenerico);
  });
});
