import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentoAddComponent } from './atendimento-add.component';

describe('AtendimentoCivilComponent', () => {
  let component: AtendimentoAddComponent;
  let fixture: ComponentFixture<AtendimentoAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtendimentoAddComponent]
    });
    fixture = TestBed.createComponent(AtendimentoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
