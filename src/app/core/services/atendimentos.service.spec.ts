import { TestBed } from '@angular/core/testing';

import { AtendimentosService } from './atendimentos.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

const mockUserData = {
  api: 'http://localhost:8080/atendimentos',
  atendimentos: [
    {
      id: 'ATE00001',
      status: 'Aguardando documentos',
      area: 'Cívil',
      instante: '4 de março de 2024 às 22:58:48 UTC-3',
      ficha: {
        assinatura: 'inseret Assistido',
        dadosSenviveis: false,
        testemunhas: {}
      },
      prazoEntregaDocumentos: '2024-04-11',
      historico: 'Atendimento criado',
      envolvidos: []
    },
  ]
};

describe(AtendimentosService.name, () => {
  let service: AtendimentosService;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule]
    }).compileComponents();
    service = TestBed.inject(AtendimentosService);
    httpController = TestBed.inject(HttpTestingController)
  });

  afterEach(() => httpController.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`#${AtendimentosService.prototype.listagemAtendimentos.name} should return a user list`, done => {
    service.listagemAtendimentos().subscribe(atendimentosList => {
      expect(atendimentosList).not.toBeFalsy();
      done();
    });
    httpController.expectOne(mockUserData.api).flush(mockUserData.atendimentos);
  });
});
