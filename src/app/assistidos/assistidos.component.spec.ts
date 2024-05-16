import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssistidosComponent } from './assistidos.component';
import { AssistidosService } from 'src/app/assistidos/services/assistidos.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { of } from 'rxjs';
import { AssistidoFull } from 'src/app/core/types/assistido';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('AssistidosComponent', () => {
  let component: AssistidosComponent;
  let fixture: ComponentFixture<AssistidosComponent>;
  let assistidosService: AssistidosService;

  const mockAssistidoGenerico: AssistidoFull = {
    nome: 'Fulano de Teste',
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
      pai: 'Teste Pai',
      mae: 'Teste Mãe'
    },
    ctps: {
      numero: '123456',
      serie: '789',
      uf: 'SP'
    },
    pis: '12345678900',
    empregadoAtualmente: true
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssistidosComponent],
      imports: [
        HttpClientTestingModule,
        MatTableModule,
        MatPaginatorModule,
        BrowserAnimationsModule
      ],
      providers: [
        AssistidosService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistidosComponent);
    component = fixture.componentInstance;
    assistidosService = TestBed.inject(AssistidosService);

    spyOn(assistidosService, 'listarAssistidos').and.returnValue(of([mockAssistidoGenerico]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call listarAssistidos and set dataSource correctly', () => {
    component.ngAfterViewInit();
    fixture.detectChanges();

    expect(assistidosService.listarAssistidos).toHaveBeenCalled();
    expect(component.dataSource.data.length).toBe(1);
    expect(component.dataSource.data).toEqual([mockAssistidoGenerico]);
  });

  it('should filter dataSource when applyFilter is called', () => {
    component.ngAfterViewInit();
    fixture.detectChanges();

    const filterEvent = { target: { value: 'fulano' } } as unknown as Event;
    component.applyFilter(filterEvent);

    expect(component.dataSource.filter).toBe('fulano');
  });
});
