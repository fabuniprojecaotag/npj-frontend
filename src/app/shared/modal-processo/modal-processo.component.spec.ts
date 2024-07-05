import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProcessoComponent } from './modal-processo.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

const dialogDataMock = {
  operacao: 'Alterado',
  numero: '0001175-18.2013.5.05.0551',
  nome: 'Indenização por Danos Morais',
  atendimentoId: 'ATE000004'
};

describe(ModalProcessoComponent.name, () => {
  let component: ModalProcessoComponent;
  let fixture: ComponentFixture<ModalProcessoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalProcessoComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dialogDataMock }
      ]
    });
    fixture = TestBed.createComponent(ModalProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
