import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AssistidosService } from 'src/app/assistidos/services/assistidos.service';
import { Assistido } from 'src/app/core/types/assistido';
import { Atendimento } from 'src/app/core/types/atendimento';
import { Processo } from 'src/app/core/types/processo';
import { ModalAtalhosComponent } from 'src/app/shared/modal-atalhos/modal-atalhos.component';
import { AppModule } from 'src/app/app.module';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { CardAtalhosComponent } from 'src/app/shared/card-atalhos/card-atalhos.component';
import { NavMenuComponent } from 'src/app/shared/header/nav-menu/nav-menu.component';
import { UserMenuComponent } from 'src/app/shared/header/user-menu/user-menu.component';
import { NavItemComponent } from 'src/app/shared/header/nav-menu/nav-item/nav-item.component';
import { AssistidosShortcutsComponent } from './assistidos-shortcuts.component';
import { ModalEditAssistidoComponent } from './modal-edit-assistido/modal-edit-assistido.component';

describe('AssistidosShortcutsComponent', () => {
  let component: AssistidosShortcutsComponent;
  let fixture: ComponentFixture<AssistidosShortcutsComponent>;
  let mockAssistidosService: jasmine.SpyObj<AssistidosService>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;

  // Mock de objetos
  const mockAssistido: Assistido = {
    nome: 'Fulano',
    email: 'fulano@teste.com',
    cpf: '123.456.789-00',
    rg: '1234567',
    nacionalidade: 'Brasileiro',
    estadoCivil: 'Solteiro',
    telefone: '(00) 1234-5678',
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
    escolaridade: 'Ensino Médio',
    filiacao: {
      pai: 'Pai do Fulano',
      mae: 'Mãe do Fulano'
    },
    profissao: 'Programador',
    remuneracao: '5000.00'
  };

  const mockAtendimento: Atendimento = {
    "@type": "Tipo",
    id: "123456",
    status: "Status",
    area: "Área",
    ficha: {
      "@type": "FichaCivil",
      assinatura: null,
      dadosSensiveis: true,
      testemunhas: [{
        nome: "Testemunha",
        qualificacao: "Qualificação",
        endereco: undefined
      }],
      medidaJuridica: "Medida",
      parteContraria: {
        nome: "Parte",
        qualificacao: "Qualificação",
        informacoesComplementares: "Informações",
      },
    },
    prazoEntregaDocumentos: "Prazo",
    historico: [{
      id: "1",
      titulo: "Título",
      descricao: "Descrição",
      instante: "2024-05-17T10:00:00Z",
      criadoPor: {
        role: "123",
        nome: "Usuário",
      },
    }],
    envolvidos: {
      estagiario: {
        id: "456",
        nome: "Estagiário",
      },
      professor: {
        id: "789",
        nome: "Professor",
      },
      secretaria: {
        id: "101",
        nome: "Secretária",
      },
      assistido: {
        id: "202",
        nome: "Assistido",
      },
    },
  };

  const mockProcesso: Processo = {
    atendimentoId: "123456",
    numero: "ABC123",
    nome: "Nome",
    dataDistribuicao: "2024-05-17",
    vara: "Civil",
    forum: "Forum",
    status: "Status",
  };

  beforeEach(() => {
    mockAssistidosService = jasmine.createSpyObj('AssistidosService', ['consultar', 'listagemAtendimentosDoAssistido']);
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      declarations: [
        AssistidosShortcutsComponent,
        HeaderComponent,
        CardAtalhosComponent,
        NavMenuComponent,
        UserMenuComponent,
        NavItemComponent
      ],
      imports: [AppModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => 'test'
              }
            }
          }
        },
        { provide: AssistidosService, useValue: mockAssistidosService },
        { provide: MatDialog, useValue: mockMatDialog }
      ]
    });

    fixture = TestBed.createComponent(AssistidosShortcutsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal for editing assistido', () => {
    mockAssistidosService.consultar.and.returnValue(of(mockAssistido));
    component.abrirModalEditar();
    expect(mockMatDialog.open).toHaveBeenCalledWith(ModalEditAssistidoComponent, {
      width: '1200px',
      height: '650px',
      data: { assistido: mockAssistido }
    });
  });

  it('should open modal for displaying atendimentos', () => {
    mockAssistidosService.listagemAtendimentosDoAssistido.and.returnValue(of([mockAtendimento]));
    component.abrirModalAtendimento();
    expect(mockMatDialog.open).toHaveBeenCalledWith(ModalAtalhosComponent, {
      width: '1200px',
      height: '650px',
      maxHeight: '100vh',
      data: { titulo: 'Atendimentos', listaAtendimento: [mockAtendimento] }
    });
  });

  it('should open modal for displaying processos', () => {
    mockAssistidosService.listagemAtendimentosDoAssistido.and.returnValue(of([mockAtendimento]));
    component.abrirModalProcesso();
    expect(mockMatDialog.open).toHaveBeenCalledWith(ModalAtalhosComponent, {
      width: '1200px',
      height: '650px',
      data: { titulo: 'Processos', listaProcesso: [mockProcesso] }
    });
  });
});
