import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { UsuarioService } from './services/usuario.service';

describe(authGuard.name, () => {
  let usuarioServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    usuarioServiceMock = {
      estaLogado: jasmine.createSpy('estaLogado')
    };
    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: UsuarioService, useValue: usuarioServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });
  });

  it('should return true if user is logged in', () => {
    usuarioServiceMock.estaLogado.and.returnValue(true);

    const result = TestBed.runInInjectionContext(() => authGuard());

    expect(result).toBe(true);
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to login page and return false if user is not logged in', () => {
    usuarioServiceMock.estaLogado.and.returnValue(false);

    const result = TestBed.runInInjectionContext(() => authGuard());

    expect(result).toBe(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/users/login']);
  });
});
