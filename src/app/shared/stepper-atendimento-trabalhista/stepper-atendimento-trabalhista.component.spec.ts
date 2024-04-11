import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperAtendimentoTrabalhistaComponent } from './stepper-atendimento-trabalhista.component';

describe('StepperAtendimentoTrabalhistaComponent', () => {
  let component: StepperAtendimentoTrabalhistaComponent;
  let fixture: ComponentFixture<StepperAtendimentoTrabalhistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StepperAtendimentoTrabalhistaComponent]
    });
    fixture = TestBed.createComponent(StepperAtendimentoTrabalhistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
