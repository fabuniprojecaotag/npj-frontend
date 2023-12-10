import { TestBed } from '@angular/core/testing';

import { AssistidosService } from './assistidos.service';

describe('AssistidosService', () => {
  let service: AssistidosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssistidosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
