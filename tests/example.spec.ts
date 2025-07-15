import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://war-sanctions.gur.gov.ua/en/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Sanctions/);
});

test('navigate to individuals page', async ({ page }) => {
  await page.goto('https://war-sanctions.gur.gov.ua/en/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Individuals' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*individuals/);
});

test('navigate to companies page', async ({ page }) => {
  await page.goto('https://war-sanctions.gur.gov.ua/en/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Companies' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*companies/);
});

test('navigate to sanctions page', async ({ page }) => {
  await page.goto('https://war-sanctions.gur.gov.ua/en/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Sanctions' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*sanctions/);
});