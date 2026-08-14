import { Page } from '@playwright/test';

export async function clickAllProductsLink(page: Page) {
  await page.getByRole('dialog').getByRole('link', { name: 'All Products', exact: true }).click();
  await waitForPageHeading(page, 'All Products');
}

export async function clickProduct(page: Page, name: string) {
  await page.getByRole('link', { name, exact: true }).click();
}

export async function clickOpenMenuButton(page: Page) {
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.getByRole('dialog').waitFor();
}

export async function clickCategoryMenuItem(page: Page, category: string) {
  await page.getByRole('dialog').getByRole('button', { name: category, exact: true }).click();
}

export async function clickSubcategoryMenuItem(page: Page, subcategory: string) {
  await page.getByRole('dialog').getByRole('link', { name: subcategory, exact: true }).click();
  await waitForPageHeading(page, subcategory);
}

async function waitForPageHeading(page: Page, name: string) {
  await page.getByRole('heading', { name, level: 1, exact: true }).waitFor();
}
