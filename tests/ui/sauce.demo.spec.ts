import { test, expect } from '@playwright/test';
import { readFile } from 'fs/promises';
import * as dotenv from 'dotenv';

dotenv.config();

const uiBaseUrl = process.env.UI_BASE_URL || 'https://fallback-url.com';
let users: any;

// Custom command equivalent
const login = async (page, username: string, password: string) => {
  await page.fill('#user-name', username);
  await page.fill('#password', password);
  await page.click('#login-button');
};

test.describe('Load testdata', () => {
  test.beforeAll(async () => {
    const data = await readFile('tests/fixtures/users.json', 'utf-8'); // adjust path if needed
    users = JSON.parse(data);
  });

  test.beforeEach(async ({ page }) => {
    await page.goto(uiBaseUrl);
    console.log(`Navigated to ${uiBaseUrl}`);
  });

  test.afterEach(async ({}, testInfo) => {
    console.log(`Test completed: ${testInfo.title}`);
  });

  test.afterAll(async () => {
    console.log('All tests finished');
    // Cleanup would happen here if needed
  });

  test('First Tc: Sauce Demo login', async ({ page }) => {
    await page.fill('#user-name', users.standard.username);
    await page.fill('#password', users.standard.password);
    await page.click('#login-button');  
    await expect(page).toHaveTitle('Swag Labs', { timeout: 10000 });
  });

  test('Second Tc: Standard user login using custom command', async ({ page }) => {
    await login(page, users.standard.username, users.standard.password);
    await expect(page).toHaveTitle('Swag Labs', { timeout: 10000 });
  });

  test('Third Tc: Locked out user login', async ({ page }) => {
    await login(page, users.lockedOut.username, users.lockedOut.password);
    await expect(page.locator('[data-test="error"]')).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  });

  test('Fourth Tc: Problem user login', async ({ page }) => {
    await login(page, users.problem.username, users.problem.password);
    await expect(page).toHaveTitle('Swag Labs', { timeout: 10000 });
  });

  test('Fifth Tc: Performance glitch user login', async ({ page }) => {
    await login(page, users.performance.username, users.performance.password);
    await expect(page.locator('title')).toHaveText('Swag Labs', { timeout: 1000 });
  });
});
