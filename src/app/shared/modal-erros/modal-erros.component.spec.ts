import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalErrosComponent } from './modal-erros.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';

const dialogDataMock = {
  codigoErro: 404,
  subtituloErro: 'Não Encontrado'
};

describe(ModalErrosComponent.name, () => {
  let component: ModalErrosComponent;
  let fixture: ComponentFixture<ModalErrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalErrosComponent],
      imports: [
        MatDividerModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dialogDataMock }
      ]
    });
    fixture = TestBed.createComponent(ModalErrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
