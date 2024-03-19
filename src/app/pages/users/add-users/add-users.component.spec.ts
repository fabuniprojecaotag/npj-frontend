import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsersComponent } from './add-users.component';
import { HttpClientModule } from '@angular/common/http';

describe('AddUsersComponent', () => {
  let component: AddUsersComponent;
  let fixture: ComponentFixture<AddUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUsersComponent, HttpClientModule],
    });
    fixture = TestBed.createComponent(AddUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
