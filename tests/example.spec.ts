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

  // Use a more specific selector for the "Companies" link
  await page.locator('nav').getByRole('link', { name: 'Companies' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*companies/);
});

test('navigate to kidnappers page and search for existing person', async ({ page }) => {
  await page.goto('https://war-sanctions.gur.gov.ua/en/kidnappers');

  // Expects the URL to contain kidnappers.
  await expect(page).toHaveURL(/.*kidnappers/);

  // Search for a specific kidnapper
  await page.getByPlaceholder('Search by name').fill('test');
  await page.press('body', 'Enter');

  // Wait for the search results to load
  await page.waitForSelector('.search-results');

  // Assert that the search results contain the searched name
  const searchResults = await page.locator('.search-results').textContent();
  expect(searchResults).toContain('test');
});

test('navigate to kidnappers page and search for non-existent person', async ({ page }) => {
  await page.goto('https://war-sanctions.gur.gov.ua/en/kidnappers');

  // Expects the URL to contain kidnappers.
  await expect(page).toHaveURL(/.*kidnappers/);

  // Search for a non-existent kidnapper
  const nonExistentName = 'NonExistentName12345';
  await page.getByPlaceholder('Search by name').fill(nonExistentName);
  await page.press('body', 'Enter');

  // Wait for the "no results" message to be displayed
  await page.waitForSelector('text=No results found');

  // Assert that the "no results" message is visible
  await expect(page.locator('text=No results found')).toBeVisible();
});

test('switch language from English to Ukrainian', async ({ page }) => {
  await page.goto('https://war-sanctions.gur.gov.ua/en/');

  // Click the language switcher to Ukrainian
  await page.getByRole('link', { name: 'UA' }).click();

  // Expect the URL to change to the Ukrainian version
  await expect(page).toHaveURL('https://war-sanctions.gur.gov.ua/uk/');

  // Verify that some key text is now in Ukrainian
  await expect(page.getByRole('link', { name: 'Головна' })).toBeVisible();
});
