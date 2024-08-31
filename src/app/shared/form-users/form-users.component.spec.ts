import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from '../header/header.component';
import { FormUsersComponent } from './form-users.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

fdescribe(FormUsersComponent.name, () => {
  let component: FormUsersComponent;
  let fixture: ComponentFixture<FormUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormUsersComponent, HeaderComponent],
      imports: [
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCheckboxModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NgxMaskDirective, NgxMaskPipe,
      ],
      providers: [
        provideNgxMask()
      ]
    });
    fixture = TestBed.createComponent(FormUsersComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`#${FormUsersComponent.prototype.executarAcaoNavegando.name} Should trigger (@Output acaoClique) when called`, () => {
    spyOn(component.acaoNavegando, 'emit');
    fixture.detectChanges();
    component.executarAcaoNavegando();
    expect(component.acaoNavegando.emit).toHaveBeenCalled();
  });

  it(`#${FormUsersComponent.prototype.excluir.name} Should trigger (@Output cliqueExcluir) when called`, () => {
    spyOn(component.cliqueExcluir, 'emit');
    fixture.detectChanges();
    component.excluir();
    expect(component.cliqueExcluir.emit).toHaveBeenCalled();
  });
});
