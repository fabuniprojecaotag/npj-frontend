import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentoEditComponent } from './atendimento-edit.component';

describe('AtendimentoEditComponent', () => {
  let component: AtendimentoEditComponent;
  let fixture: ComponentFixture<AtendimentoEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtendimentoEditComponent]
    });
    fixture = TestBed.createComponent(AtendimentoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
