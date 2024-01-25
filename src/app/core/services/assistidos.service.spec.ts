import { TestBed } from '@angular/core/testing';

import { AssistidosService } from './assistidos.service';
import { HttpClientModule } from '@angular/common/http';

describe('AssistidosService', () => {
  let service: AssistidosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(AssistidosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
