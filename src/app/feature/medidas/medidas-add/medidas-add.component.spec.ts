import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedidasAddComponent } from './medidas-add.component';

describe('MedidasAddComponent', () => {
  let component: MedidasAddComponent;
  let fixture: ComponentFixture<MedidasAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedidasAddComponent]
    });
    fixture = TestBed.createComponent(MedidasAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
