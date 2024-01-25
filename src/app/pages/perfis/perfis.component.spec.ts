import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfisComponent } from './perfis.component';

describe('PerfisComponent', () => {
  let component: PerfisComponent;
  let fixture: ComponentFixture<PerfisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfisComponent]
    });
    fixture = TestBed.createComponent(PerfisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
