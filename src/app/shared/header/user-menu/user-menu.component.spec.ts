import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { UsuarioService } from 'src/app/autenticacao/services/usuario.service';
import { UserMenuComponent } from './user-menu.component';

class UsuarioServiceMock {
  logout() {
    return;
  }
}

describe(UserMenuComponent.name, () => {
  let component: UserMenuComponent;
  let fixture: ComponentFixture<UserMenuComponent>;
  let router: Router;
  let usuarioService: UsuarioService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UserMenuComponent],
      imports: [MatIconModule, RouterTestingModule],
      providers: [{ provide: UsuarioService, useClass: UsuarioServiceMock }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMenuComponent);
    component = fixture.componentInstance;
    component.nome = 'Rodrigo Lira';
    usuarioService = TestBed.inject(UsuarioService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout() from UsuarioService and navigate to "/"', () => {
    const logoutSpy = spyOn(usuarioService, 'logout');
    const navigateSpy = spyOn(router, 'navigate');

    component.logout();

    expect(logoutSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
});
