import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAtalhosComponent } from './card-atalhos.component';

describe('CardAtalhosComponent', () => {
  let component: CardAtalhosComponent;
  let fixture: ComponentFixture<CardAtalhosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardAtalhosComponent]
    });
    fixture = TestBed.createComponent(CardAtalhosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
