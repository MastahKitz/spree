import { Page, expect } from '@playwright/test';
import { ProductData } from './product.data';

export async function assertProductListPage(page: Page, totalCount: number) {
  await expect.soft(page.getByRole('heading', { name: 'All Products', level: 1, exact: true })).toBeVisible();
  await expect.soft(page.getByText('Browse our complete collection', { exact: true })).toBeVisible();
  // filters
  await expect.soft(page.getByRole('button', { name: 'Color', exact: true })).toBeVisible();
  await expect.soft(page.getByRole('button', { name: 'Price', exact: true })).toBeVisible();
  await expect.soft(page.getByRole('button', { name: 'Availability', exact: true })).toBeVisible();
  // sort
  await expect.soft(page.getByRole('button', { name: 'Sort', exact: true })).toBeVisible();
  // total product count
  await expect.soft(page.getByText(`${totalCount} products`, { exact: true })).toBeVisible();
}

export async function assertProductInList(page: Page, product: ProductData) {
  await expect.soft(page.getByRole('link', { name: product.name, exact: true })).toBeVisible();
  // Some product cards are duplicated (hidden) in the DOM for responsive layouts,
  // so this is scoped to the visible instance of the price.
  await expect.soft(page.getByText(product.price, { exact: true }).and(page.locator(':visible'))).toBeVisible();
}

export async function assertProductDetails(page: Page, product: ProductData) {
  await expect.soft(page.getByRole('heading', { name: product.name, level: 1, exact: true })).toBeVisible();
  // The price text also appears (hidden) in a related-products section, so
  // this is scoped to the visible instance — the one in the main info panel.
  await expect.soft(page.getByText(product.price, { exact: true }).and(page.locator(':visible'))).toBeVisible();
  await expect.soft(page.getByText('In Stock', { exact: true })).toBeVisible();
  await expect.soft(page.getByRole('button', { name: 'Add to Cart', exact: true })).toBeVisible();
  // description
  await expect.soft(page.getByRole('heading', { name: 'Description', level: 2, exact: true })).toBeVisible();
  await expect.soft(page.getByText(product.description, { exact: true })).toBeVisible();
  // properties
  await expect.soft(page.getByRole('heading', { name: 'Properties', level: 2, exact: true })).toBeVisible();
  await assertFieldValue(page, 'Warranty', product.properties.warranty);
  await assertFieldValue(page, 'Wattage', product.properties.wattage);
  await assertFieldValue(page, 'Voltage', product.properties.voltage);
  // details
  await expect.soft(page.getByRole('heading', { name: 'Details', level: 2, exact: true })).toBeVisible();
  await assertFieldValue(page, 'SKU', product.details.sku);
  await assertFieldValue(page, 'Options', product.details.options);
}

async function assertFieldValue(page: Page, term: string, value: string) {
  const dd = page.locator(`dt:text-is("${term}") + dd`);
  await expect.soft(dd).toHaveText(value);
}
