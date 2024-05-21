import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NavMenuComponent } from 'src/app/shared/header/nav-menu/nav-menu.component';
import { UserMenuComponent } from 'src/app/shared/header/user-menu/user-menu.component';
import { NavItemComponent } from 'src/app/shared/header/nav-menu/nav-item/nav-item.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, RouterModule } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, HeaderComponent, NavMenuComponent, UserMenuComponent, NavItemComponent],
      imports: [HttpClientModule, MatToolbarModule, MatIconModule, MatExpansionModule, BrowserAnimationsModule, RouterModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => 'test'
              }
            }
          }
        }
      ]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verify home title', () => {
    expect(component.subtituloDaPagina).toEqual('Home');
  });
});
