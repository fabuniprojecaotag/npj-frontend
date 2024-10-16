import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessoEditComponent } from './processo-edit.component';
import { ProcessosService } from '../services/processos.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { UtilsBarComponent } from 'src/app/shared/components/utils-bar/utils-bar.component';
import { FormProcessoComponent } from 'src/app/shared/components/form-processo/form-processo.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NavMenuComponent } from 'src/app/shared/nav-menu/nav-menu.component';
import { UserMenuComponent } from 'src/app/shared/components/header/user-menu/user-menu.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { NavItemComponent } from 'src/app/shared/nav-item/nav-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AtendimentoAutocompleteComponent } from 'src/app/shared/components/form-processo/atendimento-autocomplete/atendimento-autocomplete.component';
import { of } from 'rxjs';
import { AtendimentosService } from 'src/app/atendimentos/services/atendimentos.service';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Processo } from 'src/app/core/types/processo';
import { ReactiveFormsModule } from '@angular/forms';

const mockProcesso: Processo = {
  atendimentoId: 'ATE123456',
  numero: '123456789',
  nome: 'Processo Generico',
  dataDistribuicao: '2024-05-17',
  vara: 'Civil',
  forum: 'Forum',
  status: 'Ativo',
};

class mockProcessosService {
  consultarProcesso(){
    return of(mockProcesso);
  }
}

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

describe(ProcessoEditComponent.name, () => {
  let component: ProcessoEditComponent;
  let fixture: ComponentFixture<ProcessoEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProcessoEditComponent,
        HeaderComponent,
        UtilsBarComponent,
        FormProcessoComponent,
        NavMenuComponent,
        UserMenuComponent,
        NavItemComponent,
        AtendimentoAutocompleteComponent
      ],
      imports: [
        BrowserAnimationsModule,
        MatAutocompleteModule,
        MatDialogModule,
        MatToolbarModule,
        MatIconModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: AtendimentosService, useClass: mockAtendimentosService },
        { provide: ProcessosService, useClass: mockProcessosService }
      ]
    });
    fixture = TestBed.createComponent(ProcessoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
