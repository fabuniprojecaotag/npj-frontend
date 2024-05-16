import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { AssistidoTrabalhista } from 'src/app/core/types/assistido';
import { AssistidosService } from '../services/assistidos.service';

import { AssistidoAddComponent } from './assistido-add.component';

describe('AssistidoAddComponent', () => {
  let component: AssistidoAddComponent;
  let fixture: ComponentFixture<AssistidoAddComponent>;
  let mockAssistidosService: jasmine.SpyObj<AssistidosService>;

  beforeEach(async () => {
    mockAssistidosService = jasmine.createSpyObj('AssistidosService', ['cadastrarAssistido']);

    await TestBed.configureTestingModule({
      declarations: [ AssistidoAddComponent ],
      imports: [
        MatDialogModule,
        RouterTestingModule
      ],
      providers: [
        { provide: AssistidosService, useValue: mockAssistidosService },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistidoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call cadastrar() on click', () => {
    spyOn(component, 'cadastrar');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.cadastrar).toHaveBeenCalled();
  });

  it('should call AssistidosService.cadastrarAssistido() on cadastrar()', () => {
    const mockAssistido: AssistidoTrabalhista = {
      ctps: {
        numero: '123456',
        serie: '789',
        uf: 'SP'
      },
      pis: '12345678900',
      empregadoAtualmente: false,
      nome: 'Fulaninho',
      rg: '1234567',
      endereco: {
        residencial: {
          logradouro: 'Rua Principal',
          bairro: 'Centro',
          numero: '123',
          complemento: 'Ap. 101',
          cep: '12345-678',
          cidade: 'Cidade Exemplo'
        }
      },
      filiacao: {
        pai: 'Fulano Pai',
        mae: 'Fulano Mãe'
      },
    };
    mockAssistidosService.cadastrarAssistido.and.returnValue(of(mockAssistido));

    component.cadastrar();

    expect(mockAssistidosService.cadastrarAssistido).toHaveBeenCalled();
  });
});
