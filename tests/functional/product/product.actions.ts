import { Page } from '@playwright/test';

export async function clickAllProductsLink(page: Page) {
  await page.getByRole('dialog').getByRole('link', { name: 'All Products', exact: true }).click();
  await page.waitForTimeout(2000);  // temporary fix for product load flakiness
}

export async function clickProduct(page: Page, name: string) {
  await page.getByRole('link', { name, exact: true }).click();
}

export async function clickOpenMenuButton(page: Page) {
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.waitForTimeout(2000);  // temporary fix for left nav load flakiness
}

export async function clickCategoryMenuItem(page: Page, category: string) {
  await page.getByRole('dialog').getByRole('button', { name: category, exact: true }).click();
}

export async function clickSubcategoryMenuItem(page: Page, subcategory: string) {
  await page.getByRole('dialog').getByRole('link', { name: subcategory, exact: true }).click();
  await page.waitForTimeout(2000);  // temporary fix for product load flakiness
}
