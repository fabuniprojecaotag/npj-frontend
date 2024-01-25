import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistidosEditComponent } from './assistidos-edit.component';

describe('AssistidosEditComponent', () => {
  let component: AssistidosEditComponent;
  let fixture: ComponentFixture<AssistidosEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssistidosEditComponent]
    });
    fixture = TestBed.createComponent(AssistidosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
