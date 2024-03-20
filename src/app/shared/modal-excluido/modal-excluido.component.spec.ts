import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExcluidoComponent } from './modal-excluido.component';
import { AppModule } from 'src/app/app.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('ModalExcluidoComponent', () => {
  let component: ModalExcluidoComponent;
  let fixture: ComponentFixture<ModalExcluidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalExcluidoComponent],
      imports: [AppModule],
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
