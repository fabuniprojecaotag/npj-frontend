import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NavItemComponent } from './nav-item.component';

describe(NavItemComponent.name, () => {
  let component: NavItemComponent;
  let fixture: ComponentFixture<NavItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavItemComponent],
      imports: [
        BrowserAnimationsModule,
        MatExpansionModule,
        MatIconModule,
        RouterTestingModule
      ]
    });
    fixture = TestBed.createComponent(NavItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
