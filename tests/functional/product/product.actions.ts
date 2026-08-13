import { Page } from '@playwright/test';

export async function clickAllProductsLink(page: Page) {
  await page.getByRole('link', { name: 'All Products' }).click();
}

export async function clickProduct(page: Page, name: string) {
  await page.getByRole('link', { name, exact: true }).click();
}
