import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistidoAutocompleteComponent } from './assistido-autocomplete.component';

describe('AssistidoAutocompleteComponent', () => {
  let component: AssistidoAutocompleteComponent;
  let fixture: ComponentFixture<AssistidoAutocompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssistidoAutocompleteComponent]
    });
    fixture = TestBed.createComponent(AssistidoAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
