import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperAtendimentosComponent } from './stepper-atendimentos.component';

describe('StepperAtendimentosComponent', () => {
  let component: StepperAtendimentosComponent;
  let fixture: ComponentFixture<StepperAtendimentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StepperAtendimentosComponent]
    });
    fixture = TestBed.createComponent(StepperAtendimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
