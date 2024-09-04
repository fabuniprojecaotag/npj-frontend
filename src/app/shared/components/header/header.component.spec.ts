import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UsuarioService } from 'src/app/autenticacao/services/usuario.service';
import { HeaderComponent } from './header.component';
import { NavItemComponent } from './nav-menu/nav-item/nav-item.component';
import { NavMenuComponent } from '../../nav-menu/nav-menu.component';
import { UserMenuComponent } from './user-menu/user-menu.component';

class MockUsuarioService {
  retornarTokenUsuario() {
    return of({ nome: 'Rodrigo Pacheco', role: 'Coordenador' });
  }
}

describe(HeaderComponent.name, () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let usuarioService: UsuarioService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        NavMenuComponent,
        NavItemComponent,
        UserMenuComponent
      ],
      imports: [
        BrowserAnimationsModule,
        MatExpansionModule,
        MatToolbarModule,
        MatIconModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ElementRef, useValue: { nativeElement: document.createElement('div') } },
        { provide: UsuarioService, useClass: MockUsuarioService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    usuarioService = TestBed.inject(UsuarioService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with user data', () => {
    expect(component.nomeUser).toBe('Rodrigo Pacheco');
    expect(component.nomePerfil).toBe('Coordenador');
  });

  it('should toggle menu visibility', () => {
    component.toggle('mainMenu');
    expect(component.isMenuAtivo).toBeTrue();

    component.toggle('mainMenu');
    expect(component.isMenuAtivo).toBeFalse();
  });

  it('should toggle user menu visibility', () => {
    component.toggle('userMenu');
    expect(component.isUserMenuAtivo).toBeTrue();

    component.toggle('userMenu');
    expect(component.isUserMenuAtivo).toBeFalse();
  });

  it('should close menu when clicking outside', () => {
    component.isMenuAtivo = true;
    component.fecharClicandoFora(new MouseEvent('click'));
    expect(component.isMenuAtivo).toBeFalse();
  });

  it('should format profile name correctly', () => {
    expect(component['formatarNomePerfil']('ADMIN')).toBe('Admin');
  });
});
