import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAtendimentoCivilComponent } from './form-atendimento-civil.component';
import { AppModule } from 'src/app/app.module';

describe('StepperAtendimentosComponent', () => {
  let component: FormAtendimentoCivilComponent;
  let fixture: ComponentFixture<FormAtendimentoCivilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormAtendimentoCivilComponent],
      imports: [AppModule]
    }).compileComponents();
    fixture = TestBed.createComponent(FormAtendimentoCivilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
