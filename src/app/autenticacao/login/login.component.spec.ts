import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AutenticacaoService } from 'src/app/autenticacao/services/autenticacao.service';
import { UsuarioService } from '../services/usuario.service';
import { LoginComponent } from './login.component';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

class MockAutenticacaoService {
  autenticar(email: string, senha: string) {
    return of('mockToken');
  }
}

class MockUsuarioService {
  estaLogado() {
    return false;
  }
}

describe(LoginComponent.name, () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let autenticacaoService: AutenticacaoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: AutenticacaoService, useClass: MockAutenticacaoService },
        { provide: UsuarioService, useClass: MockUsuarioService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    autenticacaoService = TestBed.inject(AutenticacaoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize login form correctly', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.controls['email']).toBeDefined();
    expect(component.loginForm.controls['senha']).toBeDefined();
  });

  it('should redirect to /home if user is already logged in', () => {
    spyOn(component['usuarioService'], 'estaLogado').and.returnValue(true);
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should navigate to /home after successful login', fakeAsync(() => {
    component.loginForm.setValue({ email: 'test@example.com', senha: 'password' });
    component.login();
    tick(500); // Simula o debounceTime
    expect(autenticacaoService.autenticar).toHaveBeenCalledWith('test@example.com', 'password');
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  }));

  it('should handle login error', fakeAsync(() => {
    spyOn(autenticacaoService, 'autenticar').and.returnValue(throwError('Erro no servidor'));
    component.loginForm.setValue({ email: 'test@example.com', senha: 'password' });
    component.login();
    tick(500); // Simula o debounceTime
    expect(component.isLoading).toBeFalse();
  }));

  it('should show alert for invalid form fields', () => {
    spyOn(window, 'alert');
    component.loginForm.setValue({ email: '', senha: '' });
    component.login();
    expect(window.alert).toHaveBeenCalledWith('Campos inválidos!');
  });

  it('should navigate to /home after successful login', fakeAsync(() => {
    component.loginForm.setValue({ email: 'test@example.com', senha: 'password' });
    spyOn(autenticacaoService, 'autenticar')
    spyOn(component['usuarioService'], 'salvarToken'); 
    component.login();
    tick(500); // Simula o debounceTime
    expect(component.isLoading).toBeFalse();
    expect(component['usuarioService'].salvarToken).toHaveBeenCalledWith('mockToken');
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  }));
});
