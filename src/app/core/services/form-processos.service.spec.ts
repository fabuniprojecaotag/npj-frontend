import { TestBed } from '@angular/core/testing';

import { FormProcessosService } from './form-processos.service';

describe('FormProcessosService', () => {
  let service: FormProcessosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormProcessosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
