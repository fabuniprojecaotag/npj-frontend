import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { authGuard } from './autenticacao/auth.guard';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './autenticacao/login/login.component';

class MockAuthGuard {
  canActivate() {
    return true;
  }
}

describe('AppRoutingModule', () => {
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        AppRoutingModule
      ],
      providers: [
        { provide: authGuard, useClass: MockAuthGuard }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation();
  });

  it('should navigate to "home" and use the HomeComponent', async () => {
    await router.navigate(['home']);
    expect(location.path()).toBe('/home');
  });

  it('should redirect empty path to "users/login"', async () => {
    await router.navigate(['']);
    expect(location.path()).toBe('/users/login');
  });

  // it('should redirect unknown path to "/" (root)', async () => {
  //   await router.navigate(['/desconhecido']);
  //   expect(location.path()).toBe('/nao-encontrada');
  // });

  it('should apply authGuard to protected routes', async () => {
    await router.navigate(['home']);
    expect(location.path()).toBe('/home');
    await router.navigate(['assistidos']);
    expect(location.path()).toBe('/assistidos');
    await router.navigate(['atendimentos']);
    expect(location.path()).toBe('/atendimentos');
    await router.navigate(['processos']);
    expect(location.path()).toBe('/processos');
    await router.navigate(['estatisticas']);
    expect(location.path()).toBe('/estatisticas');
  });
});
