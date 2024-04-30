import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAtendimentoTrabalhistaComponent } from './form-atendimento-trabalhista.component';

describe('StepperAtendimentoTrabalhistaComponent', () => {
  let component: FormAtendimentoTrabalhistaComponent;
  let fixture: ComponentFixture<FormAtendimentoTrabalhistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormAtendimentoTrabalhistaComponent]
    });
    fixture = TestBed.createComponent(FormAtendimentoTrabalhistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
