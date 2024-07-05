import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ModalExcluirProcessoComponent } from './modal-excluir-processo.component';

const dialogRefMock = {
  close: jasmine.createSpy('close')
};

const dialogDataMock = {
  numero: '0001175-18.2013.5.05.0551',
  deletar: jasmine.createSpy('deletar')
};

describe(ModalExcluirProcessoComponent.name, () => {
  let component: ModalExcluirProcessoComponent;
  let fixture: ComponentFixture<ModalExcluirProcessoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalExcluirProcessoComponent],
      imports: [
        MatIconModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: dialogDataMock }
      ]
    });
    fixture = TestBed.createComponent(ModalExcluirProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deletar and close dialog when openDialog is called', () => {
    component.openDialog();
    expect(dialogDataMock.deletar).toHaveBeenCalled();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });

  it('should close dialog when cancelar is called', () => {
    component.cancelar();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });
});
