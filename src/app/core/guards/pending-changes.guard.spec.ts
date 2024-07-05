import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { pendingChangesGuard } from './pending-changes.guard';

describe(pendingChangesGuard.name, () => {
  let guard: any;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = pendingChangesGuard;
  });

  it('should allow navigation if there are no unsaved changes', () => {
    const component: any = {
      hasUnsavedChanges: () => false
    };

    const result = guard(component);

    expect(result).toBe(true);
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should prevent navigation and confirm if there are unsaved changes', () => {
    const component: any = {
      hasUnsavedChanges: () => true
    };

    spyOn(window, 'confirm').and.returnValue(true); // Simulando confirmação do usuário

    const result = guard(component);

    expect(result).toBe(true); // Deve permitir a navegação após confirmação do usuário
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should prevent navigation if there are unsaved changes and user cancels', () => {
    const component: any = {
      hasUnsavedChanges: () => true
    };

    spyOn(window, 'confirm').and.returnValue(false); // Simulando cancelamento do usuário

    const result = guard(component);

    expect(result).toBe(false); // Deve impedir a navegação se o usuário cancelar
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});
