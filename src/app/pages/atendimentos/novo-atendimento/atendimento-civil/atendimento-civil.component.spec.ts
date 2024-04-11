import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentoCivilComponent } from './atendimento-civil.component';

describe('AtendimentoCivilComponent', () => {
  let component: AtendimentoCivilComponent;
  let fixture: ComponentFixture<AtendimentoCivilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtendimentoCivilComponent]
    });
    fixture = TestBed.createComponent(AtendimentoCivilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
