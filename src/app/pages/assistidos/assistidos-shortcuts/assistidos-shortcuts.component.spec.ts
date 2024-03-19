import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistidosShortcutsComponent } from './assistidos-shortcuts.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { CardAtalhosComponent } from 'src/app/shared/card-atalhos/card-atalhos.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NavMenuComponent } from 'src/app/shared/nav-menu/nav-menu.component';
import { UserMenuComponent } from 'src/app/shared/user-menu/user-menu.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { NavItemComponent } from 'src/app/shared/nav-menu/nav-item/nav-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';

describe('AssistidosShortcutsComponent', () => {
  let component: AssistidosShortcutsComponent;
  let fixture: ComponentFixture<AssistidosShortcutsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssistidosShortcutsComponent, HeaderComponent, CardAtalhosComponent, NavMenuComponent, UserMenuComponent, NavItemComponent],
      imports: [HttpClientModule, RouterModule, BrowserAnimationsModule, MatToolbarModule, MatIconModule, MatExpansionModule, MatCardModule],
      providers: [
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
    fixture = TestBed.createComponent(AssistidosShortcutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
