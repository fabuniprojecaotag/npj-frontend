import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilsBarComponent } from './utils-bar.component';

describe('UtilsBarComponent', () => {
  let component: UtilsBarComponent;
  let fixture: ComponentFixture<UtilsBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UtilsBarComponent]
    });
    fixture = TestBed.createComponent(UtilsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
