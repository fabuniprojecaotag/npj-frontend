import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavItemComponent } from './nav-item.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, RouterModule } from '@angular/router';

describe('NavItemComponent', () => {
  let component: NavItemComponent;
  let fixture: ComponentFixture<NavItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavItemComponent],
      imports: [MatExpansionModule, MatIconModule, BrowserAnimationsModule, RouterModule],
      providers: [
        // Fornecer uma instância mock do ActivatedRoute
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => 'test' // Simule um valor para paramMap.get()
              }
            }
          }
        }
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
