import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AtendimentosService } from 'src/app/atendimentos/services/atendimentos.service';
import { AtendimentoAutocompleteComponent } from './atendimento-autocomplete/atendimento-autocomplete.component';
import { FormProcessoComponent } from './form-processo.component';

class mockAtendimentosService {
  listagemAtendimentos(){
    return of();
  }
}

describe(FormProcessoComponent.name, () => {
  let component: FormProcessoComponent;
  let fixture: ComponentFixture<FormProcessoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormProcessoComponent, AtendimentoAutocompleteComponent],
      imports: [
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatInputModule,
        ReactiveFormsModule
      ],
      providers: [
        {provide: AtendimentosService, useClass: mockAtendimentosService}
      ]
    });
    fixture = TestBed.createComponent(FormProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
