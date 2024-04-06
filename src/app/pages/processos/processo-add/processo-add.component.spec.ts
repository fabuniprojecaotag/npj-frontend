import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessoAddComponent } from './processo-add.component';

describe('ProcessoAddComponent', () => {
  let component: ProcessoAddComponent;
  let fixture: ComponentFixture<ProcessoAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessoAddComponent]
    });
    fixture = TestBed.createComponent(ProcessoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
