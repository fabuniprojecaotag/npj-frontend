import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { NavMenuComponent } from 'src/app/shared/nav-menu/nav-menu.component';
import { UserMenuComponent } from 'src/app/shared/components/header/user-menu/user-menu.component';
import { NavItemComponent } from '../../shared/components/header/nav-menu/nav-item/nav-item.component';
import { UtilsBarComponent } from '../../shared/components/utils-bar/utils-bar.component';
import { DialogContentExampleDialogComponent, HomeComponent } from './home.component';
import { of } from 'rxjs';

class MatDialogMock {
  open() {
    return {
      afterClosed() {
        return {
          subscribe(callback: () => void) {
            callback();
          }
        };
      }
    } as MatDialogRef<DialogContentExampleDialogComponent>;
  }
}

describe(HomeComponent.name, () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        HeaderComponent,
        NavMenuComponent,
        UserMenuComponent,
        UtilsBarComponent,
        NavItemComponent
      ],
      imports: [
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatExpansionModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: MatDialog, useClass: MatDialogMock },
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verify home title', () => {
    expect(component.subtituloDaPagina).toEqual('Home');
  });

  it('should open dialog when first time flag is not set', fakeAsync(() => {
    spyOn(component.dialog, 'open').and.callThrough();
    spyOn(localStorage, 'getItem').and.returnValue(null);

    component.ngOnInit();
    tick();

    expect(component.verifyLocalStorageDialogFlag()).toBeFalsy();
    expect(component.dialog.open).toHaveBeenCalled();
  }));

  it('should not open dialog when first time flag is already set', fakeAsync(() => {
    spyOn(component.dialog, 'open').and.callThrough();
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(true));

    component.ngOnInit();
    tick();

    expect(component.verifyLocalStorageDialogFlag()).toBeTruthy();
    expect(component.dialog.open).not.toHaveBeenCalled();
  }));

  it('should set firstTime flag in localStorage after dialog is closed', fakeAsync(() => {
    const localStorageSpy = spyOn(localStorage, 'setItem');

    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed() {
        return of(true); // Simula o fechamento do diálogo com sucesso
      }
    } as MatDialogRef<DialogContentExampleDialogComponent>);

    component.ngOnInit();
    tick();

    // Verifica se a flag firstTime está inicialmente falsa
    expect(component.verifyLocalStorageDialogFlag()).toBeFalsy();

    // Simula o fechamento do diálogo
    component.openDialog();
    tick();

    // Verifica se localStorage.setItem foi chamado corretamente
    expect(localStorageSpy).toHaveBeenCalledWith('firstTime', JSON.stringify(true));

    // Verifica se a flag firstTime agora está true após o fechamento do diálogo
    expect(component.verifyLocalStorageDialogFlag()).toBeTruthy();
  }));


});
