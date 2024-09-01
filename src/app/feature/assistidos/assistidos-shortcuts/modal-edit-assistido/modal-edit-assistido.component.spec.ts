import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { of } from 'rxjs';
import { ViacepService } from 'src/app/core/services/viacep.service';
import { FormAssistidosComponent } from 'src/app/shared/form-assistidos/form-assistidos.component';
import { AssistidosService } from '../../services/assistidos.service';
import { ModalEditAssistidoComponent } from './modal-edit-assistido.component';

const mockDialogData = {
  assistido: { 
    cpf: '12345678900', 
    nome: 'Rodrigo Santos Aires', 
    email: 'rodrigo.santos@gmail.com',
    rg: '111.111.11-111',
    filiacao: {
      mae: 'Helena Marques Aires',
      pai: 'Antônio Da Silva Aires',
    },
    endereco: {
      residencial: {
        cep: '1111111-111',
        complemento: '00',
        numero: '0',
        bairro: '',
        logradouro: '',
        cidade: ''
      }
    },
    dependentes: 0
  }
};

class MockAssistidosService {
  editarAssistido() {
    return of(mockDialogData.assistido);
  }

  excluirAssistido() {
    return of({});
  }
}

const mockDialog = {
  closeAll: jasmine.createSpy('closeAll'),
  open: jasmine.createSpy('open')
};

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
    return of({ mockViacepResponse });
  }
}

const mockRouter = {
  navigate: jasmine.createSpy('navigate').and.returnValue(Promise.resolve(true))
};

describe(ModalEditAssistidoComponent.name, () => {
  let component: ModalEditAssistidoComponent;
  let fixture: ComponentFixture<ModalEditAssistidoComponent>;
  let assistidosService: AssistidosService;
  let router: Router;
  let dialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalEditAssistidoComponent, FormAssistidosComponent],
      imports: [
        BrowserAnimationsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        RouterTestingModule,
        ReactiveFormsModule,
        NgxMaskDirective, NgxMaskPipe,
      ],
      providers: [
        { provide: AssistidosService, useClass: MockAssistidosService },
        { provide: ViacepService, useClass: MockViacepService },
        { provide: MatDialog, useValue: mockDialog },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: Router, useValue: mockRouter },
        provideNgxMask()
      ]
    });

    fixture = TestBed.createComponent(ModalEditAssistidoComponent);
    assistidosService = TestBed.inject(AssistidosService);
    dialog = TestBed.inject(MatDialog);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load form data on init', fakeAsync(() => {
    spyOn(component, 'carregarFormulario').and.callThrough();
    component.ngAfterViewInit();
    tick();  
    expect(component.carregarFormulario).toHaveBeenCalled();
  }));

  it('should call editarAssistido and close dialog on edit', () => {
    spyOn(assistidosService, 'editarAssistido').and.callThrough();
    spyOn(component, 'atualizarPagina').and.callFake(() => {});
    component.editar();

    expect(assistidosService.editarAssistido).toHaveBeenCalled();
    expect(dialog.closeAll).toHaveBeenCalled();
  });

  it('should call excluirAssistido and navigate on excluir', () => {
    spyOn(assistidosService, 'excluirAssistido').and.callThrough();
    component.excluir();
    expect(assistidosService.excluirAssistido).toHaveBeenCalled();
    expect(dialog.closeAll).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/assistidos/list']);
  });

  it('should open excluir modal on abrirModalExcluir', () => {
    component.abrirModalExcluir(mockDialogData.assistido);
    expect(dialog.open).toHaveBeenCalled();
  });

  it('should open assistido modal on abrirModal', () => {
    component.abrirModal(mockDialogData.assistido);
    expect(dialog.open).toHaveBeenCalled();
  });

  it('should close dialog on fechar', () => {
    component.fechar();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });
});
