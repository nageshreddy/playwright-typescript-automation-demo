import { test, expect, Page } from '@playwright/test';
import injectAxe from '@axe-core/playwright';
import checkA11y, { AxeBuilder } from '@axe-core/playwright';

class AccessibilityTester {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async runAccessibilityCheck(selector: string | null = null): Promise<void> {
    await new injectAxe({ page: this.page });
    const axeBuilder = new AxeBuilder({ page: this.page });
    const results = await axeBuilder.analyze();
    console.log(results);
  }
}

test.describe('Accessibility Audit', () => {
  test('should have no accessibility violations on the homepage', async ({ page }) => {
    const accessibilityTester = new AccessibilityTester(page);

    await accessibilityTester.navigateTo('https://www.2gether-international.org/j');
    await accessibilityTester.runAccessibilityCheck();
  });
});
