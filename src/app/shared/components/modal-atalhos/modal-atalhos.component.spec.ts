import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ModalAtalhosComponent } from './modal-atalhos.component';

const dialogRefMock = {
  close: jasmine.createSpy('close')
};

const dialogDataMock = {
  titulo: 'Título',
  listaAtendimento: [],
};

describe(ModalAtalhosComponent.name, () => {
  let component: ModalAtalhosComponent;
  let fixture: ComponentFixture<ModalAtalhosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAtalhosComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: dialogDataMock }
      ]
    });

    fixture = TestBed.createComponent(ModalAtalhosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog when fechar() is called', () => {
    component.fechar();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });
});
