import { TestBed } from '@angular/core/testing';

import { CadastroService } from './cadastro.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Usuario } from '../../core/types/usuario';

const mockUserData = {
  api: 'http://localhost:8080/usuários',
  apiMyUser: 'http://localhost:8080/usuários/me',
  usuarios: [
    {
      id: '1',
      nome: 'Teste 1',
      senha: '12345',
      email: 'teste1@gmail.com',
      status: true,
      role: 'ADMINISTRADOR',
    },
    {
      id: '2',
      nome: 'Teste 2',
      senha: '54321',
      email: 'teste2@projecao.edu.br',
      status: true,
      role: 'COORDENADOR',
    },
    {
      id: '3',
      nome: 'Teste 3',
      senha: '678910',
      email: 'teste3@projecao.edu.br',
      status: true,
      role: 'PROFESSOR',
    },
  ]
};

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

  // teste para retornar meu usuário atual logado será implementado
  // it(`#${CadastroService.prototype.buscarMeuUsuario.name} should return my current user`, done => {
  //   service.buscarMeuUsuario().subscribe(myUser => {
  //     expect(myUser).not.toBeFalsy();
  //     done();
  //   });
  //   httpController.expectOne(mockUserData.apiMyUser).flush(mockUserData.usuarios);
  // });

  it(`#${CadastroService.prototype.buscarCadastro.name} should return a user`, done => {
    const email = 'teste2@projecao.edu.br';
    const data = mockUserData.usuarios.find(u => u.email === email);
    const usuarioEsperado: Usuario = {
      nome: data?.nome ?? '',
      email: data?.email ??'',
      id: data?.id ?? '',
      status: data?.status ?? false,
      senha: data?.senha ?? '',
      role: data?.role ?? '',
      unidadeInstitucional: '',
      '@type': ''
    };

    if (!usuarioEsperado) {
      fail(`Usuário com o e-mail ${email} não encontrado na lista mockada.`);
      return;
    }

    service.buscarCadastro(email).subscribe(user => {
      expect(user).toEqual(usuarioEsperado);
      done();
    });

    httpController.expectOne(`${mockUserData.api}/${email}`).flush(usuarioEsperado);
  });

  it(`#${CadastroService.prototype.listarUsuarios.name} should return a user list`, done => {
    service.listarUsuarios().subscribe(userList => {
      expect(userList).not.toBeFalsy();
      done();
    });

    httpController.expectOne(mockUserData.api).flush(mockUserData.usuarios);
  });
});
