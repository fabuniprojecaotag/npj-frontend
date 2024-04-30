import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperAtendimentosComponent } from './form-atendimento-civil.component';
import { AppModule } from 'src/app/app.module';

describe('StepperAtendimentosComponent', () => {
  let component: StepperAtendimentosComponent;
  let fixture: ComponentFixture<StepperAtendimentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepperAtendimentosComponent],
      imports: [AppModule]
    }).compileComponents();
    fixture = TestBed.createComponent(StepperAtendimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
