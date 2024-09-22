import { expect, Locator, Page } from "@playwright/test";
import { test as base } from "@playwright/test";

export const test = base.extend<{ paginaLogin: PaginaLogin }>({
  paginaLogin: async ({ page }, use) => {
    const paginaLogin = new PaginaLogin(page);
    await paginaLogin.visitar();
    await use(paginaLogin);
  }
});

export default class PaginaLogin {
  private readonly page: Page;
  private readonly inputEmail: Locator;
  private readonly inputSenha: Locator;
  private readonly botaoLogin: Locator;

  constructor(page: Page){
    this.page = page;
    this.inputEmail = page.getByTestId('input-email');
    this.inputSenha = page.getByTestId('input-senha');
    this.botaoLogin = page.getByTestId('botao-login');
  }

  async visitar() {
    await this.page.goto('/');
    await expect(this.page).toHaveURL('/users/login');
  }

  async realizarLogin(login: string, senha: string){
    await this.inputEmail.fill(login);
    await this.inputSenha.fill(senha);
    await this.botaoLogin.click();
  }

  async preencherOsCamposVazio() {
    await this.inputSenha.fill('');
    await this.inputEmail.fill('');
    await this.inputEmail.blur();
}


  async clicarNoCampoSenha() {
    await this.inputSenha.click();
  }

  async loginFeitoComSucesso() {
    await expect(this.page).toHaveURL('/home');
  }

  async estaMostrandoMensagemDeErro(mensagem: string) {
    const elementoErro = this.page.getByText(mensagem);
    await elementoErro.waitFor({ state: 'visible' });
    await expect(elementoErro).toBeVisible();
  }
}
