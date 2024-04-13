import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorAutocompleteComponent } from './supervisor-autocomplete.component';

describe('SupervisorAutocompleteComponent', () => {
  let component: SupervisorAutocompleteComponent;
  let fixture: ComponentFixture<SupervisorAutocompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupervisorAutocompleteComponent]
    });
    fixture = TestBed.createComponent(SupervisorAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
