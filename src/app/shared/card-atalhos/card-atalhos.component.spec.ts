import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CardAtalhosComponent } from './card-atalhos.component';

describe(CardAtalhosComponent.name, () => {
  let component: CardAtalhosComponent;
  let fixture: ComponentFixture<CardAtalhosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardAtalhosComponent],
      imports: [MatCardModule, MatIconModule]
    });
    fixture = TestBed.createComponent(CardAtalhosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
