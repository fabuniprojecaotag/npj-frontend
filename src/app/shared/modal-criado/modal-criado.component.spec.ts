import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCriadoComponent } from './modal-criado.component';
import { AppModule } from 'src/app/app.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('ModalCriadoComponent', () => {
  let component: ModalCriadoComponent;
  let fixture: ComponentFixture<ModalCriadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalCriadoComponent],
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
    fixture = TestBed.createComponent(ModalCriadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
