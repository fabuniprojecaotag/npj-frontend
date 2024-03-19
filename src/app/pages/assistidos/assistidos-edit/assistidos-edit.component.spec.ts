import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

import { AssistidosEditComponent } from './assistidos-edit.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { UtilsBarComponent } from 'src/app/shared/utils-bar/utils-bar.component';
import { FormAssistidosComponent } from 'src/app/shared/form-assistidos/form-assistidos.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NavMenuComponent } from 'src/app/shared/nav-menu/nav-menu.component';
import { UserMenuComponent } from 'src/app/shared/user-menu/user-menu.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { NavItemComponent } from 'src/app/shared/nav-menu/nav-item/nav-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AssistidosEditComponent', () => {
  let component: AssistidosEditComponent;
  let fixture: ComponentFixture<AssistidosEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssistidosEditComponent, HeaderComponent, UtilsBarComponent, FormAssistidosComponent, NavMenuComponent, UserMenuComponent, NavItemComponent],
      imports: [HttpClientModule, MatDialogModule, MatToolbarModule, MatIconModule, MatExpansionModule, BrowserAnimationsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of({ get: (key: string) => 'test' }) }
        }
      ]
    });
    fixture = TestBed.createComponent(AssistidosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
