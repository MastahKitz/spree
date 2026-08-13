import { Page, Locator, expect } from '@playwright/test';
import { CartData, CartItemData } from './cart.data';

export async function assertCartDetails(page: Page, cart: CartData) {
  const main = page.getByRole('main');
  await expect.soft(main.getByRole('heading', { name: 'Shopping Cart', level: 1 })).toBeVisible();

  for (const item of cart.items) {
    await assertCartItem(main, item);
  }

  const expectedSubtotal = formatPrice(
    cart.items.reduce((sum, item) => sum + parsePrice(item.product.price) * item.quantity, 0),
  );
  const subtotal = main.locator('dt:text-is("Subtotal") + dd');
  await expect.soft(subtotal).toHaveText(expectedSubtotal);
}

function parsePrice(price: string): number {
  return Number(price.replace(/[^0-9.]/g, ''));
}

function formatPrice(amount: number): string {
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

async function assertCartItem(main: Locator, item: CartItemData) {
  const { product, quantity } = item;
  // name
  await expect.soft(main.getByRole('heading', { name: product.name, level: 3, exact: true })).toBeVisible();
  // price
  const unitPrice = main.locator(`h3:text-is("${product.name}") + p + p`);
  await expect.soft(unitPrice).toHaveText(product.price);
  // quantity
  const removeButton = main.getByRole('button', { name: `Remove ${product.name}` });
  const quantityInput = removeButton.locator('xpath=preceding-sibling::div[1]').getByRole('textbox', { name: 'Quantity' });
  await expect.soft(quantityInput).toHaveValue(String(quantity));
}

export async function assertCartIsEmpty(page: Page) {
  const main = page.getByRole('main');

  await expect.soft(main.getByRole('heading', { name: 'Your cart is empty', level: 1 })).toBeVisible();
  await expect.soft(main.getByRole('link', { name: 'Continue Shopping' })).toBeVisible();
}
