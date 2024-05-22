import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Filtro } from 'src/app/core/types/filtro';
import { environment } from 'src/environments/environment';
import { AtendimentosService } from './atendimentos.service';

const mockAtendimento = {
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
    assistido: { id: '1', nome: '' }
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
      expect(atendimentos).toEqual([mockAtendimento]);
    });

    const req = httpTestingController.expectOne(`${environment.API_URL}/atendimentos`);

    expect(req.request.method).toBe('GET');
    req.flush([mockAtendimento]);
  });

  it('#should retrieve list of atendimentos from API with filters via GET', () => {
    const filtro: Filtro = { field: 'status', filter: 'equals', value: 'Aguardando documentos' };

    service.listagemAtendimentos(filtro).subscribe(atendimentos => {
      expect(atendimentos).toEqual([mockAtendimento]);
    });

    const req = httpTestingController.expectOne(
      `${environment.API_URL}/atendimentos?field=status&filter=equals&value=Aguardando%20documentos`
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('field')).toBe(filtro.field);
    expect(req.request.params.get('filter')).toBe(filtro.filter);
    expect(req.request.params.get('value')).toBe(filtro.value);
    req.flush([mockAtendimento]);
  });

  it('#should retrieve a specific atendimento from API via GET', () => {
    const idAtendimento = 'ATE00001';

    service.consultaAtendimento(idAtendimento).subscribe(atendimento => {
      expect(atendimento).toEqual(mockAtendimento);
    });

    const req = httpTestingController.expectOne(`${environment.API_URL}/atendimentos/${idAtendimento}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockAtendimento);
  });

  it('#should create a new atendimento via POST', () => {
    service.cadastrarAtendimento(mockAtendimento).subscribe(atendimento => {
      expect(atendimento).toEqual(mockAtendimento);
    });

    const req = httpTestingController.expectOne(`${environment.API_URL}/atendimentos`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockAtendimento);
    req.flush(mockAtendimento);
  });

  it('#should update an existing atendimento via PUT', () => {
    const idAtendimento = 'ATE00001';

    service.atualizarAtendimento(mockAtendimento, idAtendimento).subscribe(atendimento => {
      expect(atendimento).toEqual(mockAtendimento);
    });

    const req = httpTestingController.expectOne(`${environment.API_URL}/atendimentos/${idAtendimento}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockAtendimento);
    req.flush(mockAtendimento);
  });

  it('#should delete an existing atendimento via DELETE', () => {
    const idAtendimento = 'ATE00001';

    service.excluirAtendimento(idAtendimento).subscribe(response => {
      expect(response).toEqual(mockAtendimento);
    });

    const req = httpTestingController.expectOne(`${environment.API_URL}/atendimentos/${idAtendimento}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockAtendimento);
  });
});
