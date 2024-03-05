import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProcessosComponent } from './form-processos.component';

describe('FormProcessosComponent', () => {
  let component: FormProcessosComponent;
  let fixture: ComponentFixture<FormProcessosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormProcessosComponent]
    });
    fixture = TestBed.createComponent(FormProcessosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
