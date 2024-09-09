import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { of } from 'rxjs';
import { AssistidosService } from 'src/app/assistidos/services/assistidos.service';
import { CadastroService } from 'src/app/autenticacao/services/cadastro.service';
import { Atendimento } from 'src/app/core/types/atendimento';
import { FormAtendimentoCivilComponent } from 'src/app/shared/components/form-atendimento-civil/form-atendimento-civil.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { NavItemComponent } from 'src/app/shared/nav-item/nav-item.component';
import { NavMenuComponent } from 'src/app/shared/nav-menu/nav-menu.component';
import { UserMenuComponent } from 'src/app/shared/components/header/user-menu/user-menu.component';
import { UtilsBarComponent } from 'src/app/shared/components/utils-bar/utils-bar.component';
import { AtendimentosService } from '../../services/atendimentos.service';
import { AtendimentoAddComponent } from './atendimento-add.component';
import { FuncionarioAutocompleteComponent } from 'src/app/shared/components/funcionario-autocomplete/funcionario-autocomplete.component';
import { AssistidoAutocompleteComponent } from 'src/app/shared/components/assistido-autocomplete/assistido-autocomplete.component';
import { PrintButtonComponent } from 'src/app/shared/components/print-button/print-button.component';

const mockAtendimento: Atendimento = {
  '@type': 'Tipo',
  id: '123456',
  status: 'Status',
  area: 'Área',
  ficha: {
    '@type': 'FichaCivil',
    assinatura: null,
    dadosSensiveis: true,
    testemunhas: [{
      nome: 'Testemunha',
      qualificacao: 'Qualificação',
      endereco: undefined
    }],
    medidaJuridica: 'Medida',
    parteContraria: {
      nome: 'Parte',
      qualificacao: 'Qualificação',
      informacoesComplementares: 'Informações',
    },
  },
  prazoEntregaDocumentos: 'Prazo',
  historico: [{
    id: '1',
    titulo: 'Título',
    descricao: 'Descrição',
    instante: '2024-05-17T10:00:00Z',
    criadoPor: {
      role: '123',
      nome: 'Usuário',
    },
  }],
  envolvidos: {
    estagiario: {
      id: '456',
      nome: 'Estagiário',
    },
    professor: {
      id: '789',
      nome: 'Professor',
    },
    secretaria: {
      id: '101',
      nome: 'Secretária',
    },
    assistido: {
      id: '202',
      nome: 'Assistido',
    },
  },
};

class mockAtendimentosService {
  atualizarAtendimento(atendimentoAtualizado: any, id: string, tipo: string) { }

  consultaAtendimento(id: string) {
    return of(mockAtendimento);
  }
}

class MockCadastroService {
  // buscarMeuUsuario(): Observable<Usuario> {
  //   return of(mockUsuario);
  // }

  // listarUsuarios() {
  //   return of([mockUsuario]);
  // }
}

class mockAssistidosService {

}

describe(AtendimentoAddComponent.name, () => {
  let component: AtendimentoAddComponent;
  let fixture: ComponentFixture<AtendimentoAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AtendimentoAddComponent,
        HeaderComponent,
        UtilsBarComponent,
        FormAtendimentoCivilComponent,
        NavMenuComponent,
        UserMenuComponent,
        NavItemComponent,
        FuncionarioAutocompleteComponent,
        AssistidoAutocompleteComponent,
        PrintButtonComponent
      ],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        MatDialogModule,
        MatToolbarModule,
        MatIconModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        NgxMaskDirective, NgxMaskPipe,
      ],
      providers: [
        { provide: AtendimentosService, useClass: mockAtendimentosService },
        { provide: AssistidosService, useClass: mockAssistidosService },
        { provide: CadastroService, useClass: MockCadastroService },
        provideNgxMask()
      ]
    });
    fixture = TestBed.createComponent(AtendimentoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
