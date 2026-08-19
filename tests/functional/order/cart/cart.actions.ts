import { Page, expect } from '@playwright/test';

export async function clickOpenCartButton(page: Page) {
  await page.getByRole('button', { name: 'Open cart' }).click();
}

export async function clickAddToCartButton(page: Page) {
  await page.getByRole('button', { name: 'Add to Cart' }).click();
}

export async function clickViewCartLink(page: Page) {
  // KNOWN-FAILURE(#21): viewCartDetails skips clickOpenCartButton before this, so the View Cart link never appears — retriage if this changes
  await page.getByRole('link', { name: 'View Cart' }).click();
  await waitForCartPage(page);
}

export async function clickFooterCartLink(page: Page) {
  await page.getByRole('contentinfo').getByRole('link', { name: 'Cart', exact: true }).click();
  await waitForCartPage(page);
}

async function waitForCartPage(page: Page) {
  await page.getByRole('main').getByRole('heading', { level: 1 }).waitFor();
}

function quantityControls(page: Page, productName: string) {
  const removeButton = page.getByRole('main').getByRole('button', { name: `Remove ${productName}` });
  return removeButton.locator('xpath=preceding-sibling::div[1]');
}

/**
 * Cart mutations here are an async server round-trip that this site's
 * backend occasionally drops silently under load (observed: the button
 * flashes disabled then re-enables with no state change, no visible error).
 * Clicks are confirmed against the resulting UI state and retried once if
 * that confirmation doesn't show up in time.
 */
async function clickAndConfirm(click: () => Promise<void>, confirm: () => Promise<void>) {
  await click();
  try {
    await confirm();
  } catch {
    await click();
    await confirm();
  }
}

export async function clickIncreaseQuantityButton(page: Page, productName: string) {
  const controls = quantityControls(page, productName);
  const quantityInput = controls.getByRole('textbox', { name: 'Quantity' });
  const increaseButton = controls.getByRole('button', { name: 'Increase quantity' });
  const before = await quantityInput.inputValue();
  await clickAndConfirm(
    () => increaseButton.click(),
    () => expect(quantityInput).not.toHaveValue(before, { timeout: 15000 }),
  );
}

export async function clickDecreaseQuantityButton(page: Page, productName: string) {
  const controls = quantityControls(page, productName);
  const quantityInput = controls.getByRole('textbox', { name: 'Quantity' });
  const decreaseButton = controls.getByRole('button', { name: 'Decrease quantity' });
  const before = await quantityInput.inputValue();
  await clickAndConfirm(
    () => decreaseButton.click(),
    () => expect(quantityInput).not.toHaveValue(before, { timeout: 15000 }),
  );
}

export async function clickRemoveItemButton(page: Page, productName: string) {
  const removeButton = page.getByRole('main').getByRole('button', { name: `Remove ${productName}` });
  await clickAndConfirm(
    () => removeButton.click(),
    () => removeButton.waitFor({ state: 'detached', timeout: 15000 }),
  );
}

export function getRemoveButtons(page: Page) {
  return page.getByRole('main').getByRole('button', { name: /^Remove / });
}

export async function clickFirstRemoveButton(page: Page) {
  const first = getRemoveButtons(page).first();
  const label = await first.getAttribute('aria-label');
  const removeButton = page.getByRole('main').getByRole('button', { name: label! });
  await clickAndConfirm(
    () => first.click(),
    () => removeButton.waitFor({ state: 'detached', timeout: 15000 }),
  );
}
