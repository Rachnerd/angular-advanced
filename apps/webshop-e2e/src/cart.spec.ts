import { test, expect } from '@playwright/test';

/**
 * This simple test is bad because:
 * - Selectors are fragile
 * - Runs vs actual server, so there's state in between runs
 */
test('Cart', async ({ page }) => {
  await page.goto('/');

  // Go to login page
  await page.click('auth-status-icon');
  await page.waitForURL('/login');

  // Click submit
  await page.click('button[type="submit"]');
  await page.waitForURL('/');

  // Click the first add to cart button
  const addToCart = page.locator('app-products-grid-smart button').nth(0);
  await addToCart.click();

  // Check if the cart count of the header is set to 1
  await expect(page.locator('ui-cart-icon div[data-count="1"]')).toBeVisible();
});
