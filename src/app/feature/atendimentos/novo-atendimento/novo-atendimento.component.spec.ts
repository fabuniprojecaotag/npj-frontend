import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoAtendimentoComponent } from './novo-atendimento.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { UtilsBarComponent } from 'src/app/shared/utils-bar/utils-bar.component';
import { FormAtendimentoCivilComponent } from 'src/app/shared/form-atendimento-civil/form-atendimento-civil.component';
import { NavMenuComponent } from 'src/app/shared/header/nav-menu/nav-menu.component';
import { UserMenuComponent } from 'src/app/shared/header/user-menu/user-menu.component';
import { NavItemComponent } from 'src/app/shared/header/nav-menu/nav-item/nav-item.component';
import { ActivatedRoute } from '@angular/router';
import { AppModule } from 'src/app/app.module';

describe('NovoAtendimentoComponent', () => {
  let component: NovoAtendimentoComponent;
  let fixture: ComponentFixture<NovoAtendimentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NovoAtendimentoComponent, HeaderComponent, UtilsBarComponent, FormAtendimentoCivilComponent, NavMenuComponent, UserMenuComponent, NavItemComponent],
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
    fixture = TestBed.createComponent(NovoAtendimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
