import { TestBed } from '@angular/core/testing';

import { PerfilService } from './perfil.service';
import { HttpClientModule } from '@angular/common/http';

describe(PerfilService.name, () => {
  let service: PerfilService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(PerfilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
