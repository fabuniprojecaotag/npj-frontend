import test from "playwright/test";
import PaginaLogin from "./page-objects/pagina-login";

test.describe("Página de Login", () => {
  test("Deve conseguir fazer login com email e senha válidos", async({ page }) => {
    const paginaLogin = new PaginaLogin(page);

    await paginaLogin.visitar();
    await paginaLogin.realizarLogin('rodrigo.pacheco', 'rodrigo-coordenador');
    await paginaLogin.loginFeitoComSucesso();
  });
});
