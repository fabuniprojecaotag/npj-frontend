import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCriadoComponent } from './modal-criado.component';

describe('ModalCriadoComponent', () => {
  let component: ModalCriadoComponent;
  let fixture: ComponentFixture<ModalCriadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCriadoComponent]
    });
    fixture = TestBed.createComponent(ModalCriadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
