import { expect, Locator, Page } from "@playwright/test";

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

  async loginFeitoComSucesso() {
    await expect(this.page).toHaveURL('/home');
  }
}
