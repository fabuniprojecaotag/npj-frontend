import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { NgZone } from '@angular/core'; // Importe NgZone
import { Assistido } from 'src/app/core/types/assistido';
import { AssistidosService } from '../services/assistidos.service';
import { AssistidoAddComponent } from './assistido-add.component';
import { FormsService } from 'src/app/core/services/forms.service';
import { ViacepService } from 'src/app/core/services/viacep.service';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { UtilsBarComponent } from 'src/app/shared/utils-bar/utils-bar.component';
import { FormAssistidosComponent } from 'src/app/shared/form-assistidos/form-assistidos.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NavMenuComponent } from 'src/app/shared/header/nav-menu/nav-menu.component';
import { UserMenuComponent } from 'src/app/shared/header/user-menu/user-menu.component';
import { NavItemComponent } from 'src/app/shared/header/nav-menu/nav-item/nav-item.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ModalAssistidoComponent } from 'src/app/shared/modal-assistido/modal-assistido.component';

const mockAssistido: Assistido = {
  cpf: '123.456.789-00',
  nome: 'Fulaninho',
  email: 'fulaninho@example.com',
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
    pai: 'Fulano Pai',
    mae: 'Fulano Mãe'
  },
};

class MockAssistidosService {
  cadastrarAssistido(assistido: Assistido) {
    return of(mockAssistido);
  }
}

const mockViacepResponse = {
  cep: '12345678',
  bairro: 'Bairro Teste',
  localidade: 'Cidade Teste',
  logradouro: 'Rua Teste',
  complemento: 'Complemento Teste',
  uf: '',
  ibge: '',
  gia: '',
  ddd: '',
  siafi: ''
};

class MockViacepService {
  consultarCep(cep: string) {
    return of(mockViacepResponse);
  }
}

describe(AssistidoAddComponent.name, () => {
  let component: AssistidoAddComponent;
  let fixture: ComponentFixture<AssistidoAddComponent>;
  let assistidosService: MockAssistidosService;
  let viacepService: MockViacepService;
  let dialog: MatDialog;
  let formsService: FormsService;
  let router: Router;
  let ngZone: NgZone; 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AssistidoAddComponent,
        HeaderComponent,
        UtilsBarComponent,
        FormAssistidosComponent,
        NavMenuComponent,
        UserMenuComponent,
        NavItemComponent
      ],
      imports: [
        BrowserAnimationsModule,
        MatExpansionModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatToolbarModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'assistidos/list', component: AssistidoAddComponent }
        ]),
        NgxMaskDirective,
        NgxMaskPipe,
      ],
      providers: [
        { provide: AssistidosService, useClass: MockAssistidosService },
        { provide: ViacepService, useClass: MockViacepService },
        { provide: MatDialog, useValue: { open: () => {} } },
        provideNgxMask()
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistidoAddComponent);
    component = fixture.componentInstance;
    assistidosService = TestBed.inject(AssistidosService) as unknown as MockAssistidosService;
    viacepService = TestBed.inject(ViacepService) as unknown as MockViacepService;
    dialog = TestBed.inject(MatDialog);
    formsService = TestBed.inject(FormsService);
    router = TestBed.inject(Router);
    ngZone = TestBed.inject(NgZone); // Injete NgZone

    // Simular que o formulário é válido e retorna mockAssistido
    spyOn(formsService, 'getForm').and.returnValue({
      valid: true,
      getRawValue: () => mockAssistido
    } as any);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call cadastrar() on button click', () => {
    spyOn(component, 'cadastrar');
    const button = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.cadastrar).toHaveBeenCalled();
  });

  it('should call cadastrarAssistido() with the correct data on successful cadastro', fakeAsync(() => {
    spyOn(assistidosService, 'cadastrarAssistido').and.returnValue(of(mockAssistido));
    spyOn(dialog, 'open').and.stub();

    component.cadastrar();
    tick();

    expect(assistidosService.cadastrarAssistido).toHaveBeenCalledWith(mockAssistido);
    expect(dialog.open).toHaveBeenCalledWith(ModalAssistidoComponent, {
      width: '552px',
      height: '360px',
      data: { operacao: 'criado', nome: mockAssistido.nome, email: mockAssistido.email, cpf: mockAssistido.cpf }
    });

    ngZone.run(() => {
      expect(router.url).toBe('/assistidos/list');
    });
  }));
});
