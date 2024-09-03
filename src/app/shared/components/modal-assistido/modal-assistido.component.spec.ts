import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAssistidoComponent } from './modal-assistido.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

const mockData = {
  operacao: 'Cadastrado',
  nome: 'José Carlos Silva',
  email: 'jose.carlos123@gmail.com',
  cpf: '123.456.789-00'
}

describe(ModalAssistidoComponent.name, () => {
  let component: ModalAssistidoComponent;
  let fixture: ComponentFixture<ModalAssistidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalAssistidoComponent],
      imports: [
        MatDialogModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockData }
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ModalAssistidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
