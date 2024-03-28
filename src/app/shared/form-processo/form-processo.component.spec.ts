import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProcessoComponent } from './form-processo.component';

describe('FormProcessoComponent', () => {
  let component: FormProcessoComponent;
  let fixture: ComponentFixture<FormProcessoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormProcessoComponent]
    });
    fixture = TestBed.createComponent(FormProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
