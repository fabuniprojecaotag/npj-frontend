import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ModalExcluidoComponent } from './modal-excluido.component';

const dialogDataMock = {
  tituloCriado: 'Título',
  nome: 'Nome',
  deletar: jasmine.createSpy('deletar')
};

const dialogRefMock = {
  close: jasmine.createSpy('close')
};

describe(ModalExcluidoComponent.name, () => {
  let component: ModalExcluidoComponent;
  let fixture: ComponentFixture<ModalExcluidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalExcluidoComponent],
      imports: [
        MatDialogModule,
        MatIconModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: dialogDataMock }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalExcluidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call delete method and close dialog on openDialog()', () => {
    component.openDialog();

    expect(dialogDataMock.deletar).toHaveBeenCalled();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });

  it('should close dialog on cancelar()', () => {
    component.cancelar();

    expect(dialogRefMock.close).toHaveBeenCalled();
  });
});
