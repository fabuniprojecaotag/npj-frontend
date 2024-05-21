import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { UtilsBarComponent } from './utils-bar.component';

describe(UtilsBarComponent.name, () => {
  let component: UtilsBarComponent;
  let fixture: ComponentFixture<UtilsBarComponent>;
  let locationMock: jasmine.SpyObj<Location>;

  beforeEach(() => {
    locationMock = jasmine.createSpyObj<Location>('Location', ['back', 'forward']);

    TestBed.configureTestingModule({
      imports: [MatIconModule, MatToolbarModule],
      declarations: [UtilsBarComponent],
      providers: [{ provide: Location, useValue: locationMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(UtilsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(window.location, 'reload');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call location.forward() on avancar()', () => {
    component.avancar();
    expect(locationMock.forward).toHaveBeenCalled();
  });

  it('should call location.back() on voltar()', () => {
    component.voltar();
    expect(locationMock.back).toHaveBeenCalled();
  });

  it('should call window.location.reload() on recarregar()', () => {
    component.recarregar();
    expect(window.location.reload).toHaveBeenCalled();
  });
});
