import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessosComponent } from './processos.component';

describe('ProcessosComponent', () => {
  let component: ProcessosComponent;
  let fixture: ComponentFixture<ProcessosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessosComponent]
    });
    fixture = TestBed.createComponent(ProcessosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
