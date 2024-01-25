import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoAtendimentoComponent } from './novo-atendimento.component';

describe('NovoAtendimentoComponent', () => {
  let component: NovoAtendimentoComponent;
  let fixture: ComponentFixture<NovoAtendimentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NovoAtendimentoComponent]
    });
    fixture = TestBed.createComponent(NovoAtendimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
