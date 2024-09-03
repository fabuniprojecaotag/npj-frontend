import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAtendimentoComponent } from './modal-atendimento.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

const dialogRefMock = {
  close: jasmine.createSpy('close')
};

const dialogDataMock = {
  operacao: 'Alterar',
  area: 'civil',
  estagiario: 'Anderson Almeida',
  assistido: 'Fernando Rocha Cunha',
  status: 'Processo Ativo'
};

describe(ModalAtendimentoComponent.name, () => {
  let component: ModalAtendimentoComponent;
  let fixture: ComponentFixture<ModalAtendimentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAtendimentoComponent],
      imports: [
        MatDialogModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: dialogDataMock }
      ]
    });
    fixture = TestBed.createComponent(ModalAtendimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog when cancelar() is called', () => {
    component.cancelar();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });

  it('should close dialog with "confirmado" when confirmar() is called', () => {
    component.confirmar();
    expect(dialogRefMock.close).toHaveBeenCalledWith('confirmado');
  });
});
