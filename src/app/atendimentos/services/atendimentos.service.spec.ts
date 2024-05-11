import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AtendimentosService } from './atendimentos.service';

const mockData = {
  api: 'http://localhost:8080/usuários',
  atendimento: {
    "@type": "TipoAtendimento",
    id: "ATE00001",
    status: "Aguardando documentos",
    area: "Cívil",
    instante: "4 de março de 2024 às 22:58:48 UTC-3",
    ficha: {
      "@type": "TipoFichaCivil",
      assinatura: {
        lastModified: 0,
        name: '',
        size: 0,
        type: '',
        webkitRelativePath: '',
        arrayBuffer: function (): Promise<ArrayBuffer> {
          throw new Error('Function not implemented.');
        },
        slice: function (start?: number | undefined, end?: number | undefined, contentType?: string | undefined): Blob {
          throw new Error('Function not implemented.');
        },
        stream: function (): ReadableStream<Uint8Array> {
          throw new Error('Function not implemented.');
        },
        text: function (): Promise<string> {
          throw new Error('Function not implemented.');
        }
      },
      dadosSensiveis: false,
      parteContraria: {
        nome: "Nome Parte Contrária",
        qualificacao: "Qualificação Parte Contrária",
        rg: "123456789",
        cpf: "98765432100",
        email: "partecontraria@example.com",
        telefone: "123456789",
        endereco: {
          logradouro: "Rua da Parte Contrária",
          bairro: "Bairro da Parte Contrária",
          numero: "123",
          complemento: "Complemento Parte Contrária",
          cep: "12345-678",
          cidade: "Cidade da Parte Contrária"
        },
        informacoesComplementares: ""
      },
      medidaJuridica: "Medida Judicial"
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
  }
};

describe(AtendimentosService.name, () => {
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

  it('#should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#should retrieve list of atendimentos from API via GET', () => {
    service.listagemAtendimentos().subscribe(atendimentos => {
      expect(atendimentos).toEqual([mockData.atendimento]);
    });

    const req = httpTestingController.expectOne(`/atendimentos`);
    expect(req.request.method).toBe('GET');
    req.flush([mockData.atendimento]);
  });

  it('#should retrieve a specific atendimento from API via GET', () => {
    const idAtendimento = 'ATE00001';

    service.consultaAtendimento(idAtendimento).subscribe(atendimento => {
      expect(atendimento).toEqual(mockData.atendimento);
    });

    const req = httpTestingController.expectOne(`${mockData.api}/atendimentos/${idAtendimento}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData.atendimento);
  });

  it('#should create a new atendimento via POST', () => {
    service.cadastrarAtendimento(mockData.atendimento).subscribe(atendimento => {
      expect(atendimento).toEqual(mockData.atendimento);
    });

    const req = httpTestingController.expectOne(`${mockData.api}/atendimentos`);
    expect(req.request.method).toBe('POST');
    req.flush(mockData.atendimento);
  });

  it('#should update an existing atendimento via PUT', () => {
    const idAtendimento = 'ATE00001';

    service.atualizarAtendimento(mockData.atendimento, idAtendimento).subscribe(atendimento => {
      expect(atendimento).toEqual(mockData.atendimento);
    });

    const req = httpTestingController.expectOne(`${mockData.api}/atendimentos/${idAtendimento}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockData.atendimento);
  });

  it('#should delete an existing atendimento via DELETE', () => {
    const idAtendimento = 'ATE00001';

    service.excluirAtendimento(idAtendimento).subscribe(atendimento => {
      expect(atendimento).toEqual(mockData.atendimento);
    });

    const req = httpTestingController.expectOne(`${mockData.api}/atendimentos/${idAtendimento}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockData.atendimento);
  });
});
