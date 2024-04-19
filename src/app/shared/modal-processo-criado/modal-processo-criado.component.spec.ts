import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProcessoCriadoComponent } from './modal-processo-criado.component';

describe('ModalProcessoCriadoComponent', () => {
  let component: ModalProcessoCriadoComponent;
  let fixture: ComponentFixture<ModalProcessoCriadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalProcessoCriadoComponent]
    });
    fixture = TestBed.createComponent(ModalProcessoCriadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
