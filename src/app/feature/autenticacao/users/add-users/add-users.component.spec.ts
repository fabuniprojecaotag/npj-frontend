import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsersComponent } from './add-users.component';
import { AppModule } from 'src/app/app.module';

describe('AddUsersComponent', () => {
  let component: AddUsersComponent;
  let fixture: ComponentFixture<AddUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUsersComponent],
      imports: [AppModule]
    });
    fixture = TestBed.createComponent(AddUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
