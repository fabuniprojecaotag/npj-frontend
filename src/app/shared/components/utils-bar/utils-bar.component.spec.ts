import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UtilsBarComponent } from './utils-bar.component';

describe(UtilsBarComponent.name, () => {
  let component: UtilsBarComponent;
  let fixture: ComponentFixture<UtilsBarComponent>;
  let router: Router;
  let locationMock: jasmine.SpyObj<Location>;

  beforeEach(async () => {
    locationMock = jasmine.createSpyObj('Location', ['forward', 'back']);
    await TestBed.configureTestingModule({
      imports: [MatIconModule, MatToolbarModule, RouterTestingModule],
      declarations: [UtilsBarComponent],
      providers: [
        { provide: Location, useValue: locationMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UtilsBarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
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

  it('should reload the page on recarregar()', async () => {
    const routerSpy = spyOn(component['router'], 'navigateByUrl').and.callThrough();
    component.recarregar();
    expect(routerSpy).toHaveBeenCalledWith('/', { skipLocationChange: true });
  });
});
