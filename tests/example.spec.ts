import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://war-sanctions.gur.gov.ua/en/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Sanctions/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://war-sanctions.gur.gov.ua/en/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Individuals' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*individuals/);
});
