import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAtendimentosComponent } from './card-atendimentos.component';
import { MatCardModule } from '@angular/material/card';
import { RouterTestingModule } from '@angular/router/testing';

const mockAtendimento =  {
  '@type': 'TipoAtendimento',
  id: 'ATE00001',
  status: 'Aguardando documentos',
  area: 'Cívil',
  instante: '4 de março de 2024 às 22:58:48 UTC-3',
  ficha: {
    '@type': 'TipoFichaCivil',
    assinatura: new File([''], 'assinatura.pdf', { type: 'application/pdf' }),
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

describe(CardAtendimentosComponent.name, () => {
  let component: CardAtendimentosComponent;
  let fixture: ComponentFixture<CardAtendimentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardAtendimentosComponent],
      imports: [
        MatCardModule,
        RouterTestingModule
      ]
    });
    fixture = TestBed.createComponent(CardAtendimentosComponent);
    component = fixture.componentInstance;
    component.atendimento = mockAtendimento;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
