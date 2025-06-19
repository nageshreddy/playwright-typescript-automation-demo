import { test, expect } from '@playwright/test';
import { readFile } from 'fs/promises';
import * as dotenv from 'dotenv';
import { LoginPage } from '../pages/LoginPage';

dotenv.config();

const uiBaseUrl = process.env.UI_BASE_URL || 'https://fallback-url.com';
let users: any;

test.describe('Load testdata with Page Object Model', () => {
  test.beforeAll(async () => {
    const data = await readFile('tests/fixtures/users.json', 'utf-8');
    users = JSON.parse(data);
  });

  test.beforeEach(async ({ page }) => {
    await page.goto(uiBaseUrl);
    console.log(`Navigated to ${uiBaseUrl}`);
  });

  test.afterEach(async ({ }, testInfo) => {
    console.log(`Test completed: ${testInfo.title}`);
  });

  test.afterAll(async () => {
    console.log('All tests finished');
  });

  test('First Tc: Sauce Demo login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(users.standard.username, users.standard.password);

    const title = await loginPage.getTitleText();
    expect(title).toBe('Swag Labs');
  });

  test('Second Tc: Standard user login using login function', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveTitle('Swag Labs');
  });

  test('Third Tc: Locked out user login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);

    const error = await loginPage.getErrorMessage();
    expect(error?.trim()).toBe('Epic sadface: Sorry, this user has been locked out.');
  });

  test('Fourth Tc: Problem user login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(users.problem.username, users.problem.password);
    await expect(page).toHaveTitle('Swag Labs');
  });

  test('Fifth Tc: Performance glitch user login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(users.performance.username, users.performance.password);

    const title = await loginPage.getTitleText();
    expect(title).toBe('Swag Labs');
  });
});
