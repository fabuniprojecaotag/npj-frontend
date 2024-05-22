import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

import { FuncionarioAutocompleteComponent } from './funcionario-autocomplete.component';
import { CadastroService } from 'src/app/autenticacao/services/cadastro.service';
import { filtro } from 'src/app/core/types/filtro';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Usuario } from 'src/app/core/types/usuario';

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

class MockCadastroService {
  listarUsuarios(filtro: filtro) {
    return of(mockUsuariosLista);
  }
}

describe(FuncionarioAutocompleteComponent.name, () => {
  let component: FuncionarioAutocompleteComponent;
  let fixture: ComponentFixture<FuncionarioAutocompleteComponent>;
  let cadastroService: CadastroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule
      ],
      declarations: [FuncionarioAutocompleteComponent],
      providers: [
        { provide: CadastroService, useClass: MockCadastroService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FuncionarioAutocompleteComponent);
    cadastroService = TestBed.inject(CadastroService);
    component = fixture.componentInstance;
    component.cargo = 'professor'; // cargo para ser pesquisado, pode ser em lowercase ou uppercase
    component.control = new FormControl(); // aqui virá um campo do form
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter employees based on input value', () => {
    const input = { nome: 'Augusto' } as Usuario;
    component.control.setValue(input);
    expect(component.filtrarSupervisores(input)).toEqual([mockUsuariosLista[0]]);
  });


  it('should display filtered employees in autocomplete', fakeAsync(() => {
    const input = 'Augusto';
    component.control.setValue(input);
    fixture.detectChanges();

    const inputElement = fixture.nativeElement.querySelector('input');
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    tick(); // Aguarda a próxima microtask
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const options = fixture.nativeElement.querySelectorAll('mat-option');

      expect(options.length).toBe(1);
      expect(options[0].textContent).toContain('Augusto Silva Alves');
    });
  }));

  it('should call CadastroService with correct filter', () => {
    const spy = spyOn(cadastroService, 'listarUsuarios').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();

    const expectedFilter: filtro = {
      field: 'role',
      filter: 'EQUAL',
      value: 'PROFESSOR'
    };

    expect(spy).toHaveBeenCalledWith(expectedFilter);
  });

  it('should populate funcionarios from CadastroService', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.funcionarios.length).toBe(2);
    expect(component.funcionarios).toEqual(mockUsuariosLista);
  });

  it('should display the correct user name using displayFn', () => {
    const usuario: Usuario = {
      '@type': 'USUARIO',
      id: 'teste.id',
      nome: 'Teste Nome',
      role: 'TEST_ROLE',
      email: 'teste@projecao.br',
      unidadeInstitucional: 'Teste',
      status: true,
      senha: ''
    };
    expect(component.displayFn(usuario)).toBe('Teste Nome');
    expect(component.displayFn({} as Usuario)).toBe('');
  });

  it('should filter correctly with uppercase and lowercase inputs', () => {
    component.control.setValue('AUGUSTO');
    expect(component.filtrarSupervisores('AUGUSTO')).toEqual([mockUsuariosLista[0]]);

    component.control.setValue('augusto');
    expect(component.filtrarSupervisores('augusto')).toEqual([mockUsuariosLista[0]]);
  });
});
