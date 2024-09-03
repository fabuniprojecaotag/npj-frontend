import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProcessosComponent } from './card-processos.component';
import { MatCardModule } from '@angular/material/card';
import { Processo } from 'src/app/core/types/processo';

const mockProcesso: Processo = {
  numero: '1',
  nome: 'Processo Mock',
  status: 'Ativo',
  vara: 'Vara Penal',
  dataDistribuicao: '09-11-2020',
  forum: 'XXX',
  atendimentoId: 'ATE000003'
};


describe(CardProcessosComponent.name, () => {
  let component: CardProcessosComponent;
  let fixture: ComponentFixture<CardProcessosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardProcessosComponent],
      imports: [
        MatCardModule
      ]
    });
    fixture = TestBed.createComponent(CardProcessosComponent);
    component = fixture.componentInstance;
    component.processo = mockProcesso;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
