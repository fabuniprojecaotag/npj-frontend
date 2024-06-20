import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
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
import { Observable, of } from 'rxjs';
import { AssistidosService } from 'src/app/assistidos/services/assistidos.service';
import { CadastroService } from 'src/app/autenticacao/services/cadastro.service';
import { AssistidoFull } from 'src/app/core/types/assistido';
import { Usuario } from 'src/app/core/types/usuario';
import { AssistidoAutocompleteComponent } from '../assistido-autocomplete/assistido-autocomplete.component';
import { FuncionarioAutocompleteComponent } from '../funcionario-autocomplete/funcionario-autocomplete.component';
import { PrintButtonComponent } from '../print-button/print-button.component';
import { FormAtendimentoCivilComponent } from './form-atendimento-civil.component';
import { UsuarioService } from 'src/app/autenticacao/services/usuario.service';

describe(FormAtendimentoCivilComponent.name, () => {
  let component: FormAtendimentoCivilComponent;
  let fixture: ComponentFixture<FormAtendimentoCivilComponent>;
  let cadastroService: CadastroService;
  let usuarioService: UsuarioService;

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

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormAtendimentoCivilComponent,
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
        ReactiveFormsModule,
        NgxMaskDirective,
        NgxMaskPipe,
      ],
      providers: [
        { provide: AssistidosService, useClass: MockAssistidoService },
        { provide: CadastroService, useClass: MockCadastroService },
        provideNgxMask()
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAtendimentoCivilComponent);
    cadastroService = TestBed.inject(CadastroService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load current user on initialization', waitForAsync(() => {
    spyOn(cadastroService, 'buscarMeuUsuario').and.callThrough();

    component.ngOnInit();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.estagiarioControl.value).toEqual(mockUsuario);
    });
  }));

  // incompleto: não esta sobrescrevendo o mock:
  it('should not set estagiarioControl when user role is not "estagiario"', fakeAsync(() => {
    const mockUsuarioDiferente = {
      id: '2',
      '@type': 'USUARIO',
      nome: 'Gustavo Almeida',
      email: 'gustavo.almeida@projecao.br',
      role: 'COORDENADOR',
      status: true,
      senha: '',
      unidadeInstitucional: 'Guará'
    };

    spyOn(cadastroService, 'buscarMeuUsuario').and.returnValue(of(mockUsuarioDiferente));

    component.ngOnInit();
    tick(); // Simulate passage of time for async operations

    fixture.detectChanges();
    expect(component.estagiarioControl.value).toBeNull();
    expect(component.formAtendimentos.get('status')?.disabled).toBe(false);
  }));


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
