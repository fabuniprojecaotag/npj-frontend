import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioAutocompleteComponent } from './funcionario-autocomplete.component';

describe('SupervisorAutocompleteComponent', () => {
  let component: FuncionarioAutocompleteComponent;
  let fixture: ComponentFixture<FuncionarioAutocompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FuncionarioAutocompleteComponent]
    });
    fixture = TestBed.createComponent(FuncionarioAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
