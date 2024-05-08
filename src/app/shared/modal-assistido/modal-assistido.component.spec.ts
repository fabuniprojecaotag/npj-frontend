import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAssistidoComponent } from './modal-assistido.component';
import { AppModule } from 'src/app/app.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('ModalCriadoComponent', () => {
  let component: ModalAssistidoComponent;
  let fixture: ComponentFixture<ModalAssistidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalAssistidoComponent],
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
    fixture = TestBed.createComponent(ModalAssistidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
