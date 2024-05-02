import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentoAutocompleteComponent } from './atendimento-autocomplete.component';

describe('AtendimentoAutocompleteComponent', () => {
  let component: AtendimentoAutocompleteComponent;
  let fixture: ComponentFixture<AtendimentoAutocompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtendimentoAutocompleteComponent]
    });
    fixture = TestBed.createComponent(AtendimentoAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
