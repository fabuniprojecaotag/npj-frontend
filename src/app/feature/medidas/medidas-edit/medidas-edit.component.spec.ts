import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedidasEditComponent } from './medidas-edit.component';

describe('MedidasEditComponent', () => {
  let component: MedidasEditComponent;
  let fixture: ComponentFixture<MedidasEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedidasEditComponent]
    });
    fixture = TestBed.createComponent(MedidasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
