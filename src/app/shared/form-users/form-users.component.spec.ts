import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUsersComponent } from './form-users.component';

describe(FormUsersComponent.name, () => {
  let component: FormUsersComponent;
  let fixture: ComponentFixture<FormUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormUsersComponent],
    });
    fixture = TestBed.createComponent(FormUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`#${FormUsersComponent.prototype.acaoClique.name} Should trigger (@Output ${FormUsersComponent.prototype.acaoClique.name}) when called`, () => {
    spyOn(component.acaoClique, 'emit');
    component.executarAcao();
    expect(component.acaoClique.emit).toHaveBeenCalled();
  })
});
