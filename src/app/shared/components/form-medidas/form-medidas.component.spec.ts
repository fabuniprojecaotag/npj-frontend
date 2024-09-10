import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMedidasComponent } from './form-medidas.component';

describe('FormMedidasComponent', () => {
  let component: FormMedidasComponent;
  let fixture: ComponentFixture<FormMedidasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormMedidasComponent]
    });
    fixture = TestBed.createComponent(FormMedidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
