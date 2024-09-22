import { test } from './page-objects/pagina-login';

test.describe("Página de Login", () => {
  test("Deve conseguir fazer login com e-mail e senha válidos", async({ paginaLogin }) => {
    await paginaLogin.realizarLogin('rodrigo.pacheco', 'rodrigo-coordenador');
    await paginaLogin.loginFeitoComSucesso();
  });

  test("Não deve permitir login com usuário e senha em branco", async ({ paginaLogin }) => {
    await paginaLogin.preencherOsCamposVazio();
    await paginaLogin.estaMostrandoMensagemDeErro('Email/Matrícula obrigatório(a)!');
    await paginaLogin.estaMostrandoMensagemDeErro('Senha é obrigatória!');
  });

  test("Não deve conseguir fazer login com usuário e senha inválidos", async ({ paginaLogin }) => {
    await paginaLogin.realizarLogin('usuario.inexistente', 'senha');
    await paginaLogin.estaMostrandoMensagemDeErro('Você não tem permissão para acessar este recurso!');
   });

   test("Não deve conseguir fazer login com usuário inválido", async ({ paginaLogin }) => {
    await paginaLogin.realizarLogin('usuario.inexistente', 'rodrigo-coordenador');
    await paginaLogin.estaMostrandoMensagemDeErro('Você não tem permissão para acessar este recurso!');
   });

   test("Não deve conseguir fazer login com senha inválida", async ({ paginaLogin }) => {
    await paginaLogin.realizarLogin('rodrigo.pacheco', 'senha-invalida');
    await paginaLogin.estaMostrandoMensagemDeErro('Você não tem permissão para acessar este recurso!');
   });
});
