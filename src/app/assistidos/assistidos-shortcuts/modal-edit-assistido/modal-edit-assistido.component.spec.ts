import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditAssistidoComponent } from './modal-edit-assistido.component';

describe('ModalEditAssistidoComponent', () => {
  let component: ModalEditAssistidoComponent;
  let fixture: ComponentFixture<ModalEditAssistidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalEditAssistidoComponent]
    });
    fixture = TestBed.createComponent(ModalEditAssistidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
