import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAssistidosComponent } from './form-assistidos.component';

describe(FormAssistidosComponent.name, () => {
  let component: FormAssistidosComponent;
  let fixture: ComponentFixture<FormAssistidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormAssistidosComponent]
    });
    fixture = TestBed.createComponent(FormAssistidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
