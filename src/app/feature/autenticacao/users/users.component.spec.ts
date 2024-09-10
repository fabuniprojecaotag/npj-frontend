import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { UtilsBarComponent } from 'src/app/shared/components/utils-bar/utils-bar.component';
import { MatPaginator } from '@angular/material/paginator';
import { AppModule } from 'src/app/app.module';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersComponent, HeaderComponent, UtilsBarComponent, MatPaginator],
      imports: [AppModule],
    });
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
