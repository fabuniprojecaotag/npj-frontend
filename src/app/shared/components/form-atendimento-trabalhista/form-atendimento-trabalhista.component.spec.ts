import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AssistidoAutocompleteComponent } from '../assistido-autocomplete/assistido-autocomplete.component';
import { FuncionarioAutocompleteComponent } from '../funcionario-autocomplete/funcionario-autocomplete.component';
import { PrintButtonComponent } from '../print-button/print-button.component';
import { FormAtendimentoTrabalhistaComponent } from './form-atendimento-trabalhista.component';
import { Observable, of } from 'rxjs';
import { AssistidoFull } from 'src/app/core/types/assistido';
import { Usuario } from 'src/app/core/types/usuario';
import { AssistidosService } from 'src/app/assistidos/services/assistidos.service';
import { CadastroService } from 'src/app/autenticacao/services/cadastro.service';
import { MatRadioModule } from '@angular/material/radio';

const mockUsuario: Usuario = {
  '@type': 'ESTAGIARIO',
  id: '1',
  nome: 'Luciano Neves',
  senha: '12345',
  email: 'luciano.neves@projecao.br',
  status: true,
  role: 'ESTAGIARIO',
  unidadeInstitucional: 'Taguatinga'
};

const mockAssistido: AssistidoFull = {
  cpf: '123.456.789-00',
  nome: 'Ednaldo Pereira Cardoso',
  rg: '1234567',
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
  filiacao: {
    pai: 'Ednaldo Pai',
    mae: 'Edna Mãe'
  },
  ctps: {
    numero: '123456',
    serie: '789',
    uf: 'SP'
  },
  pis: '12345678900',
  empregadoAtualmente: true
};

class MockCadastroService {
  buscarMeuUsuario(): Observable<Usuario> {
    return of(mockUsuario);
  }

  listarUsuarios() {
    return of([mockUsuario]);
  }
}

class MockAssistidoService {
  listarAssistidos() {
    return of([mockAssistido]);
  }
}

describe(FormAtendimentoTrabalhistaComponent.name, () => {
  let component: FormAtendimentoTrabalhistaComponent;
  let fixture: ComponentFixture<FormAtendimentoTrabalhistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormAtendimentoTrabalhistaComponent,
        FuncionarioAutocompleteComponent,
        AssistidoAutocompleteComponent,
        PrintButtonComponent
      ],
      imports: [
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        MatInputModule,
        MatRadioModule,
        ReactiveFormsModule,
        NgxMaskDirective,
        NgxMaskPipe,
      ],
      providers: [
        { provide: AssistidosService, useClass: MockAssistidoService },
        { provide: CadastroService, useClass: MockCadastroService },
        provideNgxMask()
      ]
    });
    fixture = TestBed.createComponent(FormAtendimentoTrabalhistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit acaoClique event when executarAcao is called', () => {
    spyOn(component.acaoClique, 'emit');

    component.executarAcao();

    expect(component.acaoClique.emit).toHaveBeenCalled();
  });

  it('should emit acaoCliqueExcluir event when excluir is called', () => {
    spyOn(component.acaoCliqueExcluir, 'emit');

    component.executarAcaoExcluir();

    expect(component.acaoCliqueExcluir.emit).toHaveBeenCalled();
  });
});
