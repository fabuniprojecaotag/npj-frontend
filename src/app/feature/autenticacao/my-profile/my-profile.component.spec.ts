import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { of } from 'rxjs';
import { FormsService } from 'src/app/core/services/forms.service';
import { Usuario } from 'src/app/core/types/usuario';
import { FormUsersComponent } from 'src/app/shared/components/form-users/form-users.component';
import { FuncionarioAutocompleteComponent } from 'src/app/shared/components/funcionario-autocomplete/funcionario-autocomplete.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { NavItemComponent } from 'src/app/shared/components/header/nav-menu/nav-item/nav-item.component';
import { NavMenuComponent } from 'src/app/shared/components/header/nav-menu/nav-menu.component';
import { UserMenuComponent } from 'src/app/shared/components/header/user-menu/user-menu.component';
import { UtilsBarComponent } from 'src/app/shared/components/utils-bar/utils-bar.component';
import { CadastroService } from '../services/cadastro.service';
import { MyProfileComponent } from './my-profile.component';

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

class MockCadastroService {
  buscarMeuUsuario() {
    return of(mockUsuario);
  }

  editarCadastro(novoCadastro: Usuario) {
    return of(novoCadastro);
  }
}

class MockFormsService {
  getForm() {
    const form = new FormGroup({
      '@type': new FormControl(mockUsuario['@type']),
      nome: new FormControl(mockUsuario.nome),
      matricula: new FormControl(mockUsuario.matricula),
      role: new FormControl(mockUsuario.role),
      cpf: new FormControl(mockUsuario.cpf),
      semestre: new FormControl(mockUsuario.semestre),
      status: new FormControl(mockUsuario.status),
      perfil: new FormControl(mockUsuario.role),
      email: new FormControl(mockUsuario.email),
      senha: new FormControl(''), // Inicializando senha como vazio
      unidadeInstitucional: new FormControl(mockUsuario.unidadeInstitucional),
    });

    return form;
  }

  setForm() { }
}

describe(MyProfileComponent.name, () => {
  let component: MyProfileComponent;
  let fixture: ComponentFixture<MyProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MyProfileComponent,
        HeaderComponent,
        UtilsBarComponent,
        NavMenuComponent,
        NavItemComponent,
        UserMenuComponent,
        FormUsersComponent,
        FuncionarioAutocompleteComponent
      ],
      imports: [
        BrowserAnimationsModule,
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatToolbarModule,
        ReactiveFormsModule,
        RouterTestingModule,
        NgxMaskDirective,
      ],
      providers: [
        { provide: CadastroService, useClass: MockCadastroService },
        { provide: FormsService, useClass: MockFormsService },
        provideNgxMask()
      ]
    });

    fixture = TestBed.createComponent(MyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user data into the form on init', () => {
    expect(component.cadastro).toEqual(mockUsuario);
  });

  it('should mark form as pristine after loading user data', (done) => {
    setTimeout(() => {
      expect(component.form?.pristine).toBeTrue();
      done();
    }, 0);
  });

  it('should call abrirModal and navigate after updating user', () => {
    const abrirModalSpy = spyOn(component as any, 'abrirModal').and.callThrough();
    const routerNavigateSpy = spyOn((component as any).router, 'navigate');

    // Manipulando o formulário para incluir a senha
    component.form?.patchValue({
      ...mockUsuario,
      senha: 'novaSenha'
    });

    fixture.detectChanges();

    component.atualizarUsuario(false);

    expect(abrirModalSpy).toHaveBeenCalledWith(jasmine.objectContaining({
      nome: 'Luciano Neves',
      senha: 'novaSenha',
      email: 'luciano.neves@projecao.br',
      role: 'ESTAGIARIO'
    }));

    expect(routerNavigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should indicate no unsaved changes correctly', () => {
    expect(component.hasUnsavedChanges()).toBeFalse();

    component.form?.get('email')?.setValue('test@example.com');

    expect(component.hasUnsavedChanges()).toBeFalse();
  });

  it('should indicate no unsaved changes correctly when form is not dirty', () => {
    expect(component.hasUnsavedChanges()).toBeFalse();
  });

});
