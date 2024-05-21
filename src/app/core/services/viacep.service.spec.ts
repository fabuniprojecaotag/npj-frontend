import { TestBed } from '@angular/core/testing';

import { ViacepService } from './viacep.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

const mockData = {
  api: 'https://viacep.com.br/ws/',
  cep: '01001000'
};

describe(ViacepService.name, () => {
  let service: ViacepService;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [ViacepService]
    }).compileComponents();
    service = TestBed.inject(ViacepService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpController.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`#${ViacepService.prototype.consultarCep.name} should return a cep`, done => {
    const cep = '01001000';
    service.consultarCep(cep).subscribe({
      next: (cep) => {
        expect(cep).not.toBeFalsy();
        done();
      },
      error: (err) => {
        fail(`Erro inesperado: ${err}`);
      }
    });

    httpController.expectOne(`${mockData.api}${mockData.cep}/json`).flush(mockData.cep);
  });
});
