import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUsersComponent } from './edit-users.component';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { UtilsBarComponent } from 'src/app/shared/components/utils-bar/utils-bar.component';
import { FormUsersComponent } from 'src/app/shared/form-users/form-users.component';
import { NavMenuComponent } from 'src/app/shared/nav-menu/nav-menu.component';
import { UserMenuComponent } from 'src/app/shared/components/header/user-menu/user-menu.component';
import { NavItemComponent } from 'src/app/shared/nav-item/nav-item.component';
import { AppModule } from 'src/app/app.module';

describe('EditUsersComponent', () => {
  let component: EditUsersComponent;
  let fixture: ComponentFixture<EditUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditUsersComponent,
        HeaderComponent,
        UtilsBarComponent,
        FormUsersComponent,
        NavMenuComponent,
        UserMenuComponent,
        NavItemComponent
      ],
      imports: [AppModule],
      providers: [ ]
    });
    fixture = TestBed.createComponent(EditUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
