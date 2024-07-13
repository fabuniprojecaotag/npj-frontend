import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from 'src/app/shared/header/header.component';
import { MyProfileComponent } from './my-profile.component';
import { Usuario } from 'src/app/core/types/usuario';
import { Observable, of } from 'rxjs';
import { CadastroService } from '../services/cadastro.service';
import { MatDialogModule } from '@angular/material/dialog';
import { UtilsBarComponent } from 'src/app/shared/utils-bar/utils-bar.component';
import { NavMenuComponent } from 'src/app/shared/header/nav-menu/nav-menu.component';
import { UserMenuComponent } from 'src/app/shared/header/user-menu/user-menu.component';
import { FormUsersComponent } from 'src/app/shared/form-users/form-users.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { NavItemComponent } from 'src/app/shared/header/nav-menu/nav-item/nav-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FuncionarioAutocompleteComponent } from 'src/app/shared/funcionario-autocomplete/funcionario-autocomplete.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

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
  buscarMeuUsuario(): Observable<Usuario> {
    return of(mockUsuario);
  }
}


fdescribe(MyProfileComponent.name, () => {
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
        {provide: CadastroService, useClass: MockCadastroService },
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
});
