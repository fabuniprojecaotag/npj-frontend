import { TestBed } from '@angular/core/testing';

import { ProcessosService } from './processos.service';

describe('ProcessosSeviceService', () => {
  let service: ProcessosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
