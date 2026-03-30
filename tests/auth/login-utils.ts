import { type Page, type Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  public async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  async login(user: string, pass: string) {
    await this.usernameInput.click();
    await this.usernameInput.fill(user);
    await this.passwordInput.click();
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }

  public async expectValidCredentialsHeader(header: string = 'Dashboard') {
    await expect(this.page.getByRole('heading', { name: header })).toBeVisible();
  }

  public async expectInvalidCredentialsAlert() {
    await expect(this.page.getByRole('alert')).toContainText('Invalid credentials');
  }
}