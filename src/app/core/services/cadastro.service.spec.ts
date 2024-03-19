import { TestBed } from '@angular/core/testing';

import { CadastroService } from './cadastro.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

const mockUserData = {
  api: 'http://localhost:8080/usuários/me',
  usuario: {
    id: 1,
    nome: 'Teste',
    senha: '12345',
    email: 'teste@gmail.com',
    status: true,
    role: 'ADMINISTRADOR',
  }
}

describe(CadastroService.name, () => {
  let service: CadastroService;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [CadastroService]
    }).compileComponents();
    service = TestBed.inject(CadastroService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpController.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`#${CadastroService.prototype.buscarMeuUsuario.name} should return user`, done => {
    service.buscarMeuUsuario().subscribe(myUser => {
      expect(myUser).not.toBeFalsy();
      done();
    });
    httpController.expectOne(mockUserData.api).flush(mockUserData.usuario);
  })
});
