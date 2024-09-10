import { TestBed } from '@angular/core/testing';

import { ProcessosService } from './processos.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Processo } from 'src/app/core/types/processo';
import { environment } from 'src/environments/environment';

const mockProcesso: Processo = {
  atendimentoId: '123456',
  numero: 'ABC123',
  nome: 'Nome',
  dataDistribuicao: '2024-05-17',
  vara: 'Civil',
  forum: 'Forum',
  status: 'Status',
};

describe(ProcessosService.name, () => {
  let service: ProcessosService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(ProcessosService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#should retrieve list of processos', () => {
    service.listarProcessos().subscribe(processos => {
      expect(processos).toEqual([mockProcesso]);
    });

    const req = httpTestingController.expectOne(`${environment.API_URL}/processos`);

    expect(req.request.method).toBe('GET');
    req.flush([mockProcesso]);
  });

  it('#should retrieve a specific processo', () => {
    const numeroProcesso = 'ABC123';

    service.consultarProcesso(numeroProcesso).subscribe(processo => {
      expect(processo).toEqual(mockProcesso);
    });

    const req = httpTestingController.expectOne(`${environment.API_URL}/processos/${numeroProcesso}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProcesso);
  });

  it('#should create a new processo', () => {
    service.cadastraProcesso(mockProcesso).subscribe(processo => {
      expect(processo).toEqual(mockProcesso);
    });

    const req = httpTestingController.expectOne(`${environment.API_URL}/processos`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockProcesso);
    req.flush(mockProcesso);
  });

  it('#should update an existing processo', () => {
    const numeroProcesso = 'ABC123';

    service.editarProcesso(numeroProcesso, mockProcesso).subscribe(processo => {
      expect(processo).toEqual(mockProcesso);
    });

    const req = httpTestingController.expectOne(`${environment.API_URL}/processos/${numeroProcesso}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockProcesso);
    req.flush(mockProcesso);
  });

  it('#should delete an existing processo', () => {
    const numeroProcesso = 'ABC123';

    service.excluirProcesso(numeroProcesso).subscribe(processo => {
      expect(processo).toEqual(mockProcesso);
    });

    const req = httpTestingController.expectOne(`${environment.API_URL}/processos/${numeroProcesso}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockProcesso);
  });
});
