import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilsBarComponent } from './utils-bar.component';
import { MatIconModule } from '@angular/material/icon';

describe(UtilsBarComponent.name, () => {
  let component: UtilsBarComponent;
  let fixture: ComponentFixture<UtilsBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule],
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
