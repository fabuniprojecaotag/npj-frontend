import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistidosShortcutsComponent } from './assistidos-shortcuts.component';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { CardAtalhosComponent } from 'src/app/shared/card-atalhos/card-atalhos.component';
import { NavMenuComponent } from 'src/app/shared/header/nav-menu/nav-menu.component';
import { UserMenuComponent } from 'src/app/shared/header/user-menu/user-menu.component';
import { NavItemComponent } from 'src/app/shared/header/nav-menu/nav-item/nav-item.component';
import { AppModule } from 'src/app/app.module';

describe('AssistidosShortcutsComponent', () => {
  let component: AssistidosShortcutsComponent;
  let fixture: ComponentFixture<AssistidosShortcutsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssistidosShortcutsComponent, HeaderComponent, CardAtalhosComponent, NavMenuComponent, UserMenuComponent, NavItemComponent],
      imports: [AppModule],
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
    fixture = TestBed.createComponent(AssistidosShortcutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
