import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstatisticasComponent } from './estatisticas.component';
import { DateAdapter } from '@angular/material/core';
import { of } from 'rxjs';
import { Processo } from '../core/types/processo';
import { ProcessosService } from '../processos/services/processos.service';
import { HeaderComponent } from '../shared/header/header.component';
import { UtilsBarComponent } from '../shared/utils-bar/utils-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NavMenuComponent } from '../shared/header/nav-menu/nav-menu.component';
import { UserMenuComponent } from '../shared/header/user-menu/user-menu.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { NavItemComponent } from '../shared/header/nav-menu/nav-item/nav-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const mockDateAdapter = jasmine.createSpyObj('DateAdapter', ['setLocale']);

const mockProcesso: Processo = {
  atendimentoId: '123456',
  numero: 'ABC123',
  nome: 'Nome',
  dataDistribuicao: new Date().toISOString(),
  vara: 'Civil',
  forum: 'Forum',
  status: 'Status',
};

class MockProcessosService {
  listar() {
    return of([mockProcesso]);
  }
}

describe(EstatisticasComponent.name, () => {
  let component: EstatisticasComponent;
  let fixture: ComponentFixture<EstatisticasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        EstatisticasComponent,
        HeaderComponent,
        UtilsBarComponent,
        NavMenuComponent,
        UserMenuComponent,
        NavItemComponent
      ],
      imports: [
        BrowserAnimationsModule,
        MatExpansionModule,
        MatIconModule,
        MatToolbarModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: DateAdapter, useValue: mockDateAdapter },
        { provide: ProcessosService, useClass: MockProcessosService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(EstatisticasComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
