import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoAtendimentoComponent } from './novo-atendimento.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { UtilsBarComponent } from 'src/app/shared/utils-bar/utils-bar.component';
import { StepperAtendimentosComponent } from 'src/app/shared/stepper-atendimentos/stepper-atendimentos.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NavMenuComponent } from 'src/app/shared/nav-menu/nav-menu.component';
import { UserMenuComponent } from 'src/app/shared/user-menu/user-menu.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { NavItemComponent } from 'src/app/shared/nav-menu/nav-item/nav-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppModule } from 'src/app/app.module';

describe('NovoAtendimentoComponent', () => {
  let component: NovoAtendimentoComponent;
  let fixture: ComponentFixture<NovoAtendimentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NovoAtendimentoComponent, HeaderComponent, UtilsBarComponent, StepperAtendimentosComponent, NavMenuComponent, UserMenuComponent, NavItemComponent],
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
