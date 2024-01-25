import { TestBed } from '@angular/core/testing';

import { RequestService } from './request.service';
import { HttpClientModule } from '@angular/common/http';

describe(RequestService.name, () => {
  let service: RequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(RequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
