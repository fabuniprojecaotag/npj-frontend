import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AtendimentosService } from './atendimentos.service';
import { Atendimento } from '../types/atendimento';

describe('AtendimentosService', () => {
  let service: AtendimentosService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AtendimentosService]
    });

    service = TestBed.inject(AtendimentosService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const mockAtendimento: Atendimento = {
    "@type": "TipoAtendimento",
    id: "ATE00001",
    status: "Aguardando documentos",
    area: "Cívil",
    instante: "4 de março de 2024 às 22:58:48 UTC-3",
    ficha: {
      "@type": "TipoFichaCivil",
      assinatura: "inseret Assistido",
      dadosSensiveis: false,
      parteContraria: {
        nome: "Nome Parte Contrária",
        qualificacao: "Qualificação Parte Contrária",
        rg: "123456789",
        cpf: "98765432100",
        email: "partecontraria@example.com",
        endereco: {
          logradouro: "Rua da Parte Contrária",
          bairro: "Bairro da Parte Contrária",
          numero: "123",
          complemento: "Complemento Parte Contrária",
          cep: "12345-678",
          cidade: "Cidade da Parte Contrária"
        },
        telefone: "123456789"
      },
      medidaJudicial: "Medida Judicial"
    },
    prazoEntregaDocumentos: "2024-04-11",
    historico: [
      {
        id: "1",
        titulo: "",
        descricao: "Atendimento criado",
        criadoPor: {
          email: "teste@email.com",
          nome: "",
          role: ""
        }
      }
    ],
    envolvidos: {
      estagiario: { id: "1", nome: "" },
      professor: { id: "1", nome: "" },
      secretaria: { id: "1", nome: "" },
      assistido: { id: "1", nome: "" }
    }
  };

  it('should retrieve list of atendimentos from API via GET', () => {
    service.listagemAtendimentos().subscribe(atendimentos => {
      expect(atendimentos).toEqual([mockAtendimento]);
    });

    const req = httpTestingController.expectOne(`${service.getApiUrl()}/atendimentos`);
    expect(req.request.method).toBe('GET');
    req.flush([mockAtendimento]);
  });

  it('should retrieve a specific atendimento from API via GET', () => {
    const idAtendimento = 'ATE00001';

    service.consultaAtendimento(idAtendimento).subscribe(atendimento => {
      expect(atendimento).toEqual(mockAtendimento);
    });

    const req = httpTestingController.expectOne(`${service.getApiUrl()}}/atendimentos/${idAtendimento}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockAtendimento);
  });

  it('should create a new atendimento via POST', () => {
    service.cadastrarAtendimento(mockAtendimento).subscribe(atendimento => {
      expect(atendimento).toEqual(mockAtendimento);
    });

    const req = httpTestingController.expectOne(`${service.getApiUrl()}/atendimentos`);
    expect(req.request.method).toBe('POST');
    req.flush(mockAtendimento);
  });

  it('should update an existing atendimento via PUT', () => {
    const idAtendimento = 'ATE00001';

    service.atualizarAtendimento(mockAtendimento, idAtendimento).subscribe(atendimento => {
      expect(atendimento).toEqual(mockAtendimento);
    });

    const req = httpTestingController.expectOne(`${service.getApiUrl()}/atendimentos/${idAtendimento}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockAtendimento);
  });

  it('should delete an existing atendimento via DELETE', () => {
    const idAtendimento = 'ATE00001';

    service.excluirAtendimento(idAtendimento).subscribe(atendimento => {
      expect(atendimento).toEqual(mockAtendimento);
    });

    const req = httpTestingController.expectOne(`${service.getApiUrl()}/atendimentos/${idAtendimento}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockAtendimento);
  });
});
