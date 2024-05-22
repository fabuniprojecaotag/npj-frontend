import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NavItemComponent } from './nav-item/nav-item.component';
import { NavMenuComponent } from './nav-menu.component';

describe(NavMenuComponent.name, () => {
  let component: NavMenuComponent;
  let fixture: ComponentFixture<NavMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavMenuComponent, NavItemComponent],
      imports: [
        BrowserAnimationsModule,
        MatExpansionModule,
        MatIconModule,
        RouterTestingModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavMenuComponent);
    component = fixture.componentInstance;
    component.perfilNome = 'Coordenador';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should convert perfilNome to uppercase during ngOnInit', () => {
    fixture.detectChanges();

    expect(component.perfilNome).toEqual('COORDENADOR');
  });
});
