import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAtalhosComponent } from './modal-atalhos.component';

describe('CardAtendimentosComponent', () => {
  let component: ModalAtalhosComponent;
  let fixture: ComponentFixture<ModalAtalhosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAtalhosComponent]
    });
    fixture = TestBed.createComponent(ModalAtalhosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
