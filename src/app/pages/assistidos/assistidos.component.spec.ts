import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistidosComponent } from './assistidos.component';

describe('AssistidosComponent', () => {
  let component: AssistidosComponent;
  let fixture: ComponentFixture<AssistidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssistidosComponent]
    });
    fixture = TestBed.createComponent(AssistidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
