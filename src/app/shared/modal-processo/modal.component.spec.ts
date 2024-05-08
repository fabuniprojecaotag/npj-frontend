import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProcessoComponent } from './modal-processo-criado.component';

describe('ModalProcessoCriadoComponent', () => {
  let component: ModalProcessoComponent;
  let fixture: ComponentFixture<ModalProcessoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalProcessoComponent]
    });
    fixture = TestBed.createComponent(ModalProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
