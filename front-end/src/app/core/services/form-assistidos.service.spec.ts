import { TestBed } from '@angular/core/testing';

import { FormAssistidosService } from './form-assistidos.service';

describe('FormAssistidosService', () => {
  let service: FormAssistidosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormAssistidosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
