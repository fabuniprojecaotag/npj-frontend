import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAtendimentosComponent } from './card-atendimentos.component';

describe('CardAtendimentosComponent', () => {
  let component: CardAtendimentosComponent;
  let fixture: ComponentFixture<CardAtendimentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardAtendimentosComponent]
    });
    fixture = TestBed.createComponent(CardAtendimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
