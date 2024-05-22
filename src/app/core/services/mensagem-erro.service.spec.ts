import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ModalErrosComponent } from 'src/app/shared/modal-erros/modal-erros.component';
import { MensagemErroService } from './mensagem-erro.service';

describe(MensagemErroService.name, () => {
  let service: MensagemErroService;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      providers: [
        MensagemErroService,
        { provide: MatDialog, useValue: dialogSpy }
      ]
    });

    service = TestBed.inject(MensagemErroService);
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call MatDialog.open with correct parameters', () => {
    const codigoErro = 404;
    const mensagemErro = 'Not Found';

    service.mostrarMensagemErro(codigoErro, mensagemErro);

    expect(dialog.open).toHaveBeenCalledWith(ModalErrosComponent, {
      width: '552px',
      height: 'auto',
      position: { top: '0' },
      data: { codigoErro: codigoErro, mensagemErro: mensagemErro }
    });
  });
});
