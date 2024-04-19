import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExcluirProcessoComponent } from './modal-excluir-processo.component';

describe('ModalExcluirProcessoComponent', () => {
  let component: ModalExcluirProcessoComponent;
  let fixture: ComponentFixture<ModalExcluirProcessoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalExcluirProcessoComponent]
    });
    fixture = TestBed.createComponent(ModalExcluirProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
