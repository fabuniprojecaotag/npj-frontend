import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownPerfilComponent } from './dropdown-perfil.component';

describe('DropdownTipoComponent', () => {
  let component: DropdownPerfilComponent;
  let fixture: ComponentFixture<DropdownPerfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownPerfilComponent]
    });
    fixture = TestBed.createComponent(DropdownPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
