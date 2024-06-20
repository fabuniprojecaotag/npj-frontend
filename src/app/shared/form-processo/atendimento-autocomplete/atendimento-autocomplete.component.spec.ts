import { ComponentFixture, TestBed, fakeAsync, flush, tick, waitForAsync } from '@angular/core/testing';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AtendimentosService } from 'src/app/atendimentos/services/atendimentos.service';
import { Atendimento } from 'src/app/core/types/atendimento';
import { AtendimentoAutocompleteComponent } from './atendimento-autocomplete.component';
import { Filtro } from 'src/app/core/types/filtro';

const mockListaAtendimentos: Atendimento[] = [
  {
    '@type': 'Civil',
    id: 'ATE000001',
    status: 'Aguardando Documentação',
    area: 'Civil',
    ficha: {
      '@type': 'Civil',
      assinatura: null,
      dadosSensiveis: false,
      medidaJuridica: 'Pensão Alimentícia',
      parteContraria: {
        nome: 'Eduardo Henrique Costa',
        qualificacao: 'Arquiteto',
        informacoesComplementares: ''
      },
      testemunhas: []
    },
    envolvidos: {
      estagiario: {
        id: '1',
        nome: 'Carlos Felício Dos Santos Soares'
      },
      professor: {
        id: '2',
        nome: 'André Augusto Souza Lima'
      },
      secretaria: {
        id: '3',
        nome: 'Pamela Rocha Alves'
      },
      assistido: {
        id: '10',
        nome: 'Pedro Henrique Vasconcelo'
      },
    }
  }
]

class MockAtendimentosService {
  listagemAtendimentos(filtro?: Filtro) {
    return of(mockListaAtendimentos);
  }
}

describe(AtendimentoAutocompleteComponent.name, () => {
  let component: AtendimentoAutocompleteComponent;
  let fixture: ComponentFixture<AtendimentoAutocompleteComponent>;
  let atendimentosService: AtendimentosService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AtendimentoAutocompleteComponent],
      imports: [
        BrowserAnimationsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: AtendimentosService, useClass: MockAtendimentosService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtendimentoAutocompleteComponent);
    atendimentosService = TestBed.inject(AtendimentosService);
    component = fixture.componentInstance;
    component.control = new FormControl();
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter employees based on input value', () => {
    const input = 'ATE000001';
    component.control.setValue(input);
    expect(component.filtrarAtendimento(input)).toEqual([mockListaAtendimentos[0]]);
  });


  // teste de integração no DOM pendente:
  // it('should display filtered atendimentos in autocomplete', fakeAsync(() => {
  //   const input = 'ATE';
  //   component.control.setValue(input);
  //   fixture.detectChanges();

  //   const inputElement = fixture.nativeElement.querySelector('input');
  //   inputElement.dispatchEvent(new Event('input'));
  //   fixture.detectChanges();

  //   tick(); // Espera a resolução das operações assíncronas causadas pelo input
  //   fixture.detectChanges();

  //   fixture.whenStable().then(() => {
  //     fixture.detectChanges();

  //     const options = fixture.nativeElement.querySelectorAll('mat-option');

  //     expect(options.length).toBe(1);
  //     expect(options[0].textContent).toContain('ATE000001');
  //   });
  // }));

  it('should populate atendimentos from AtendimentosService', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.atendimento.length).toBe(1);
    expect(component.atendimento).toEqual(mockListaAtendimentos);
  });

  it('should display the correct atendimento ID using displayFn', () => {
    const atendimento: Atendimento = {
      '@type': 'Civil',
      id: 'ATE000001',
      status: 'Aguardando Documentação',
      area: 'Civil',
      ficha: {
        '@type': 'Civil',
        assinatura: null,
        dadosSensiveis: false,
        medidaJuridica: 'Pensão Alimentícia',
        parteContraria: {
          nome: 'Eduardo Henrique Costa',
          qualificacao: 'Arquiteto',
          informacoesComplementares: ''
        },
        testemunhas: []
      },
      envolvidos: {
        estagiario: {
          id: '1',
          nome: 'Carlos Felício Dos Santos Soares'
        },
        professor: {
          id: '2',
          nome: 'André Augusto Souza Lima'
        },
        secretaria: {
          id: '3',
          nome: 'Pamela Rocha Alves'
        },
        assistido: {
          id: '10',
          nome: 'Pedro Henrique Vasconcelo'
        },
      }
    };
    expect(component.displayFn(atendimento.id)).toBe('ATE000001');
    expect(component.displayFn('')).toBe('');
  });

  it('should filter correctly with uppercase and lowercase inputs', () => {
    component.control.setValue('ATE000001');
    expect(component.filtrarAtendimento('ATE000001')).toEqual([mockListaAtendimentos[0]]);

    component.control.setValue('ate000001');
    expect(component.filtrarAtendimento('ate000001')).toEqual([mockListaAtendimentos[0]]);
  });
});
