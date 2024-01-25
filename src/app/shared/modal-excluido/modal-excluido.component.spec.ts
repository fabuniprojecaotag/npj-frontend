import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExcluidoComponent } from './modal-excluido.component';

describe('ModalExcluidoComponent', () => {
  let component: ModalExcluidoComponent;
  let fixture: ComponentFixture<ModalExcluidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalExcluidoComponent]
    });
    fixture = TestBed.createComponent(ModalExcluidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
