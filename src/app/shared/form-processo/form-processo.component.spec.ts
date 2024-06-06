import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AtendimentosService } from 'src/app/atendimentos/services/atendimentos.service';
import { AtendimentoAutocompleteComponent } from './atendimento-autocomplete/atendimento-autocomplete.component';
import { FormProcessoComponent } from './form-processo.component';

const mockListaAtendimento = [
  {
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
];

class mockAtendimentosService {
  listagemAtendimentos(){
    return of(mockListaAtendimento);
  }
}

describe(FormProcessoComponent.name, () => {
  let component: FormProcessoComponent;
  let fixture: ComponentFixture<FormProcessoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormProcessoComponent, AtendimentoAutocompleteComponent],
      imports: [
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatInputModule,
        ReactiveFormsModule
      ],
      providers: [
        {provide: AtendimentosService, useClass: mockAtendimentosService}
      ]
    });
    fixture = TestBed.createComponent(FormProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit acaoClick event when executarAcao is called', () => {
    spyOn(component.acaoClick, 'emit');

    component.executarAcao();

    expect(component.acaoClick.emit).toHaveBeenCalled();
  });

  it('should emit acaoExcluir event when excluir is called', () => {
    spyOn(component.acaoExcluir, 'emit');

    component.excluir();

    expect(component.acaoExcluir.emit).toHaveBeenCalled();
  });
});
