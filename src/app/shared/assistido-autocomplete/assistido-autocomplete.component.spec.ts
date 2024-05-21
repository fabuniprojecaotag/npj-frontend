import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { of } from 'rxjs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AssistidosService } from 'src/app/assistidos/services/assistidos.service';
import { Assistido } from 'src/app/core/types/assistido';
import { AssistidoAutocompleteComponent } from './assistido-autocomplete.component';

const mockAssistidosLista: Assistido[] = [
  {
    cpf: '111.111.111-11',
    nome: 'João Paulo',
    rg: '1.111.111',
    endereco: {
      residencial: {
        cep: '01001-000',
        logradouro: 'Praça da Sé',
        complemento: 'lado ímpar',
        bairro: 'Sé',
        cidade: 'São Paulo',
      },
      comercial: {},
    },
    filiacao: {
      pai: 'Thiago Cardoso',
      mae: 'Carla Cardoso Andrade'
    }
  },
  {
    cpf: '222.222.222-22',
    nome: 'Pedro Borges',
    rg: '2.222.222',
    endereco: {
      residencial: {
        cep: '01001-000',
        logradouro: 'Praça da Sé',
        complemento: 'lado ímpar',
        bairro: 'Sé',
        cidade: 'São Paulo',
        numero: ''
      },
      comercial: {},
    },
    filiacao: {
      pai: 'Lucas Sousa',
      mae: 'Isabela Sousa Lima'
    }
  },
];

class MockAssistidosService {
  listarAssistidos() {
    return of(mockAssistidosLista);
  }
}

describe(AssistidoAutocompleteComponent.name, () => {
  let component: AssistidoAutocompleteComponent;
  let fixture: ComponentFixture<AssistidoAutocompleteComponent>;
  let assistidosService: AssistidosService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AssistidoAutocompleteComponent],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule
      ],
      providers: [
        { provide: AssistidosService, useClass: MockAssistidosService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistidoAutocompleteComponent);
    assistidosService = TestBed.inject(AssistidosService);
    component = fixture.componentInstance;
    component.control = new FormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter assistidos based on input value', () => {
    const input = { nome: 'João Paulo' } as Assistido;
    component.control.setValue(input);
    expect(component.filtrarAssistidos(input)).toEqual([mockAssistidosLista[0]]);
  });


  it('should display filtered assistidos in autocomplete', fakeAsync(() => {
    const input = 'João';
    component.control.setValue(input);
    fixture.detectChanges();

    const inputElement = fixture.nativeElement.querySelector('input');
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    tick();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const options = fixture.nativeElement.querySelectorAll('mat-option');

      expect(options.length).toBe(1);
      expect(options[0].textContent).toContain('João Paulo');
    });
  }));

  it('should populate assistidos from CadastroService', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.assistidos.length).toBe(2);
    expect(component.assistidos).toEqual(mockAssistidosLista);
  });

  it('should display the correct user name using displayFn', () => {
    const assistido: Assistido = {
      cpf: '000.000.000-00',
      nome: 'Teste Nome',
      rg: '0.000.000-00',
      endereco: {
        residencial: {
          cep: '00000-000',
          logradouro: 'Praça da Sé',
          complemento: 'lado ímpar',
          bairro: 'Sé',
          cidade: 'São Paulo',
          numero: ''
        },
        comercial: {},
      },
      filiacao: {
        pai: 'Teste Pai',
        mae: 'Teste Mãe'
      }
    };
    expect(component.displayFn(assistido)).toBe('Teste Nome');
    expect(component.displayFn({} as Assistido)).toBe('');
  });

  it('should filter correctly with uppercase and lowercase inputs', () => {
    component.control.setValue('JOÃO');
    expect(component.filtrarAssistidos('JOÃO')).toEqual([mockAssistidosLista[0]]);

    component.control.setValue('joão');
    expect(component.filtrarAssistidos('joão')).toEqual([mockAssistidosLista[0]]);
  });
});

