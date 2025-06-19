import { test, expect } from '@playwright/test';

test.describe('Visual regression tests for Sauce Demo', () => {

  test.skip('Full page screenshot', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/');
    
    // Wait for login form to be visible
    await expect(page.locator('#login-button')).toBeVisible();

    // Take a full-page screenshot for baseline comparison
    expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('loginpage-full-expected.png');
  });

  test.skip('Login form snapshot', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/');
    
    const loginBox = page.locator('.login-box'); // Adjust if needed
    await expect(loginBox).toBeVisible();

    expect(await loginBox.screenshot()).toMatchSnapshot('login-box.png');
  });
});
