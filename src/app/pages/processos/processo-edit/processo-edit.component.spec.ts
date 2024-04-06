import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessoEditComponent } from './processo-edit.component';

describe('ProcessoEditComponent', () => {
  let component: ProcessoEditComponent;
  let fixture: ComponentFixture<ProcessoEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessoEditComponent]
    });
    fixture = TestBed.createComponent(ProcessoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
