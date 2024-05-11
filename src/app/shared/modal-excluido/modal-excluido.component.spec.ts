import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ModalExcluidoComponent } from './modal-excluido.component';

describe('ModalExcluidoComponent', () => {
  let component: ModalExcluidoComponent;
  let fixture: ComponentFixture<ModalExcluidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalExcluidoComponent],
      imports: [MatDialogModule, NoopAnimationsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: () => { },
          },
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalExcluidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
