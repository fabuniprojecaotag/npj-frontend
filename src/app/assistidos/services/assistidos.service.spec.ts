import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AssistidoCivil, AssistidoFull, AssistidoTrabalhista } from 'src/app/core/types/assistido';
import { environment } from 'src/environments/environment';
import { AssistidosService } from './assistidos.service';

const mockAssistidosLista: (AssistidoCivil | AssistidoFull | AssistidoTrabalhista)[] = [
  {
    cpf: '010.000.020-11',
    nome: 'Jonathan Alves Rocha',
    rg: '1.111.111',
    endereco: {
      residencial: {
        cep: '01001-000',
        logradouro: 'Praça da Sé',
        complemento: 'lado ímpar',
        bairro: 'Sé',
        cidade: 'São Paulo',
      },
      comercial: {},
    },
    filiacao: {
      pai: 'Thiago Cardoso',
      mae: 'Carla Cardoso Andrade'
    }
  },
  {
    cpf: '222.222.222-22',
    nome: 'Pedro Borges',
    rg: '2.222.222',
    endereco: {
      residencial: {
        cep: '01001-000',
        logradouro: 'Praça da Sé',
        complemento: 'lado ímpar',
        bairro: 'Sé',
        cidade: 'São Paulo',
        numero: ''
      },
      comercial: {},
    },
    filiacao: {
      pai: 'Lucas Sousa',
      mae: 'Isabela Sousa Lima'
    }
  },
];

const mockListaAtendimento = [
  {
    '@type': 'TipoAtendimento',
    id: 'ATE00001',
    status: 'Aguardando documentos',
    area: 'Cívil',
    instante: '4 de março de 2024 às 22:58:48 UTC-3',
    ficha: {
      '@type': 'TipoFichaCivil',
      assinatura: new File([""], "assinatura.pdf", { type: "application/pdf" }),
      dadosSensiveis: false,
      parteContraria: {
        nome: 'Nome Parte Contrária',
        qualificacao: 'Qualificação Parte Contrária',
        rg: '123456789',
        cpf: '98765432100',
        email: 'partecontraria@example.com',
        telefone: '123456789',
        endereco: {
          logradouro: 'Rua da Parte Contrária',
          bairro: 'Bairro da Parte Contrária',
          numero: '123',
          complemento: 'Complemento Parte Contrária',
          cep: '12345-678',
          cidade: 'Cidade da Parte Contrária'
        },
        informacoesComplementares: ''
      },
      medidaJuridica: 'Medida Judicial'
    },
    prazoEntregaDocumentos: '2024-04-11',
    historico: [
      {
        id: '1',
        titulo: '',
        descricao: 'Atendimento criado',
        criadoPor: {
          email: 'teste@email.com',
          nome: '',
          role: ''
        }
      }
    ],
    envolvidos: {
      estagiario: { id: '1', nome: '' },
      professor: { id: '1', nome: '' },
      secretaria: { id: '1', nome: '' },
      assistido: { id: '010.000.020-11', nome: 'Jonathan Alves Rocha' }
    }
  }
];

describe(AssistidosService.name, () => {
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

  it('#should retrieve assistidos from the API via GET', () => {
    service.listarAssistidos().subscribe(assistidos => {
      expect(assistidos.length).toBe(2);
      expect(assistidos).toEqual(mockAssistidosLista);
    });

    const req = httpTestingController.expectOne(`${environment.API_URL}/assistidos`);
    expect(req.request.method).toBe('GET');
    req.flush(mockAssistidosLista);
  });

  it('#should retrieve atendimentos related to assistido from the API via GET', () => {
    const id = mockAssistidosLista[0].cpf;
    service.listagemAtendimentosDoAssistido(id).subscribe(atendimento => {
      expect(atendimento.length).toBe(1);
      expect(atendimento[0].id).toEqual(mockListaAtendimento[0].id);
    });

    const req = httpTestingController.expectOne(`${environment.API_URL}/assistidos/${id}/atendimentos`);
    expect(req.request.method).toBe('GET');
    req.flush(mockListaAtendimento);
  });

  it('#should add a new assistido to the API via POST', () => {
    service.cadastrarAssistido(mockAssistidosLista[0]).subscribe(assistido => {
      expect(assistido).toEqual(mockAssistidosLista[0]);
    });

    const req = httpTestingController.expectOne(`${environment.API_URL}/assistidos`);
    expect(req.request.method).toBe('POST');
    req.flush(mockAssistidosLista[0]);
  });

  it('#should edit an existing assistido via PUT', () => {
    const id = mockAssistidosLista[0].cpf;
    service.editarAssistido(id, mockAssistidosLista[0]).subscribe(assistido => {
      expect(assistido).toEqual(mockAssistidosLista[0]);
    });

    const req = httpTestingController.expectOne(`${environment.API_URL}/assistidos/${id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockAssistidosLista[0]);
  });

  it('#should delete an existing assistido via DELETE', () => {
    const id = mockAssistidosLista[0].cpf;
    service.excluirAssistido(id).subscribe(assistido => {
      expect(assistido).toEqual(mockAssistidosLista[0]);
    });

    const req = httpTestingController.expectOne(`${environment.API_URL}/assistidos/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockAssistidosLista[0]);
  });

  it('#should retrieve an existing assistido via GET', () => {
    const id = mockAssistidosLista[0].cpf;
    service.consultarAssistido(id).subscribe(assistido => {
      expect(assistido).toEqual(mockAssistidosLista[0]);
    });

    const req = httpTestingController.expectOne(`${environment.API_URL}/assistidos/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockAssistidosLista[0]);
  });
});
