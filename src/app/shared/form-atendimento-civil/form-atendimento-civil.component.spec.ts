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
import { of } from 'rxjs';
import { AssistidosService } from 'src/app/assistidos/services/assistidos.service';
import { CadastroService } from 'src/app/autenticacao/services/cadastro.service';
import { AssistidoFull } from 'src/app/core/types/assistido';
import { Usuario } from 'src/app/core/types/usuario';
import { AssistidoAutocompleteComponent } from '../assistido-autocomplete/assistido-autocomplete.component';
import { FuncionarioAutocompleteComponent } from '../funcionario-autocomplete/funcionario-autocomplete.component';
import { PrintButtonComponent } from '../print-button/print-button.component';
import { FormAtendimentoCivilComponent } from './form-atendimento-civil.component';

const mockUsuario: Usuario = {
  '@type': 'COORDENADOR',
  id: '1',
  nome: 'Luciano Neves',
  senha: '12345',
  email: 'luciano.neves@projecao.br',
  status: true,
  role: 'COORDENADOR',
  unidadeInstitucional: 'Taguatinga'
}

const mockUsuariosLista = [
  {
    '@type': 'USUARIO',
    id: 'augusto.silva',
    nome: 'Augusto Silva Alves',
    role: 'PROFESSOR',
    email: 'augusto.silva@projecao.br',
    unidadeInstitucional: 'Taguatinga',
    status: true,
    senha: ''
  },
  {
    '@type': 'USUARIO',
    id: 'larissa.barbossa',
    nome: 'Larissa Barbossa Rodrigues',
    role: 'PROFESSOR',
    email: 'larissa.barbossa@projecao.br',
    unidadeInstitucional: 'Guará',
    status: true,
    senha: ''
  },
];

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

class mockCadastroService {
  buscarMeuUsuario() {
    return of(mockUsuario);
  }

  listarUsuarios() {
    return of(mockUsuariosLista);
  }
}

class mockAssistidoService {
  listarAssistidos() {
    return of([mockAssistido]);
  }
}

describe(FormAtendimentoCivilComponent.name, () => {
  let component: FormAtendimentoCivilComponent;
  let fixture: ComponentFixture<FormAtendimentoCivilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
        NgxMaskDirective, NgxMaskPipe,
      ],
      providers: [
        { provide: CadastroService, useClass: mockCadastroService },
        { provide: AssistidosService, useClass: mockAssistidoService },
        provideNgxMask()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormAtendimentoCivilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
