import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'; // Importe o módulo MatSelectModule

import { FormUsersComponent } from './form-users.component';
import { HeaderComponent } from '../header/header.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe(FormUsersComponent.name, () => {
  let component: FormUsersComponent;
  let fixture: ComponentFixture<FormUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormUsersComponent, HeaderComponent],
      imports: [MatCardModule, MatFormFieldModule, MatSelectModule, MatCheckboxModule, MatIconModule, ReactiveFormsModule, MatInputModule, BrowserAnimationsModule]
    });
    fixture = TestBed.createComponent(FormUsersComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`#${FormUsersComponent.prototype.executarAcao.name} Should trigger (@Output acaoClique) when called`, () => {
    spyOn(component.acaoClique, 'emit');
    fixture.detectChanges();
    component.executarAcao();
    expect(component.acaoClique.emit).toHaveBeenCalled();
  });

  it(`#${FormUsersComponent.prototype.excluir.name} Should trigger (@Output cliqueExcluir) when called`, () => {
    spyOn(component.cliqueExcluir, 'emit');
    fixture.detectChanges();
    component.excluir();
    expect(component.cliqueExcluir.emit).toHaveBeenCalled();
  });
});
