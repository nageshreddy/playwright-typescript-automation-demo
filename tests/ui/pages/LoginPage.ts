import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async login(username: string, password: string) {
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
  }

  async getErrorMessage(): Promise<string> {
    const errorMessage = await this.page.locator('[data-test="error"]').textContent();
    if (errorMessage === null) {
      throw new Error('Error message not found');
    }
    return errorMessage;
  }

  async getTitleText(): Promise<string | null> {
    return this.page.evaluate(() => document.querySelector('title')?.textContent ?? null);
  }
}
