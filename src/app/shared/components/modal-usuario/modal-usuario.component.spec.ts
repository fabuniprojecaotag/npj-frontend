import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUsuarioComponent } from './modal-usuario.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

const dialogDataMock = {
  tipo: 'COORDENADOR',
  nome: 'Rodrigo Pacheco',
  email: 'rodrigo.pacheco@projecao.br',
  senha: '123456'
};

describe(ModalUsuarioComponent.name, () => {
  let component: ModalUsuarioComponent;
  let fixture: ComponentFixture<ModalUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalUsuarioComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dialogDataMock }
      ]
    });
    fixture = TestBed.createComponent(ModalUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
