import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
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
import { AssistidoAutocompleteComponent } from 'src/app/shared/assistido-autocomplete/assistido-autocomplete.component';
import { FormAtendimentoCivilComponent } from 'src/app/shared/form-atendimento-civil/form-atendimento-civil.component';
import { FuncionarioAutocompleteComponent } from 'src/app/shared/funcionario-autocomplete/funcionario-autocomplete.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { NavItemComponent } from 'src/app/shared/header/nav-menu/nav-item/nav-item.component';
import { NavMenuComponent } from 'src/app/shared/header/nav-menu/nav-menu.component';
import { UserMenuComponent } from 'src/app/shared/header/user-menu/user-menu.component';
import { PrintButtonComponent } from 'src/app/shared/print-button/print-button.component';
import { UtilsBarComponent } from 'src/app/shared/utils-bar/utils-bar.component';
import { AtendimentosService } from '../services/atendimentos.service';
import { AtendimentoEditComponent } from './atendimento-edit.component';

class mockAtendimentosService {
  atualizarAtendimento(atendimentoAtualizado: any, id: string, tipo: string) { }

  consultaAtendimento(id: string) {
    return of()
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

describe(AtendimentoEditComponent.name, () => {
  let component: AtendimentoEditComponent;
  let fixture: ComponentFixture<AtendimentoEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AtendimentoEditComponent,
        HeaderComponent,
        UtilsBarComponent,
        NavMenuComponent,
        UserMenuComponent,
        NavItemComponent,
        FormAtendimentoCivilComponent,
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
    fixture = TestBed.createComponent(AtendimentoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
