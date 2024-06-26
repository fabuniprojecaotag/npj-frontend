import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { AssistidosService } from '../../services/assistidos.service';
import { ModalEditAssistidoComponent } from './modal-edit-assistido.component';
import { FormAssistidosComponent } from 'src/app/shared/form-assistidos/form-assistidos.component';
import { ViacepService } from 'src/app/core/services/viacep.service';
import { of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class mockAssistidosService {
  editarAssistido() { }
  excluirAssistido() {
    return {
      subscribe: () => { }
    };
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
    return of({ mockViacepResponse });
  }
}

describe(ModalEditAssistidoComponent.name, () => {
  let component: ModalEditAssistidoComponent;
  let fixture: ComponentFixture<ModalEditAssistidoComponent>;

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
        { provide: AssistidosService, useClass: mockAssistidosService },
        { provide: ViacepService, useClass: MockViacepService },
        { provide: MAT_DIALOG_DATA, useValue: { assistido: { cpf: '12345678900', nome: 'John Doe', email: 'johndoe@example.com' } } },
        { provide: MatDialogRef, useValue: {} },
        provideNgxMask()
      ]
    });
    fixture = TestBed.createComponent(ModalEditAssistidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
