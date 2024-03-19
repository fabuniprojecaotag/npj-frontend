import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { AtendimentosComponent } from './atendimentos.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { UtilsBarComponent } from 'src/app/shared/utils-bar/utils-bar.component';
import { NavMenuComponent } from 'src/app/shared/nav-menu/nav-menu.component';
import { UserMenuComponent } from 'src/app/shared/user-menu/user-menu.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { NavItemComponent } from 'src/app/shared/nav-menu/nav-item/nav-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';

describe('AtendimentosComponent', () => {
  let component: AtendimentosComponent;
  let fixture: ComponentFixture<AtendimentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtendimentosComponent, HeaderComponent, UtilsBarComponent, NavMenuComponent, UserMenuComponent, NavItemComponent],
      imports: [
        HttpClientModule,
        MatPaginatorModule,
        MatToolbarModule,
        MatIconModule,
        MatExpansionModule,
        MatTableModule,
        BrowserAnimationsModule,
        RouterModule
      ],
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
    fixture = TestBed.createComponent(AtendimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
