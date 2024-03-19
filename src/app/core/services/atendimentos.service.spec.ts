import { TestBed } from '@angular/core/testing';

import { AtendimentosService } from './atendimentos.service';
import { HttpClientModule } from '@angular/common/http';

describe('AtendimentosService', () => {
  let service: AtendimentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(AtendimentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
