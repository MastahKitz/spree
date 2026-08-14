import { Page, expect } from '@playwright/test';
import { ProductData } from '../../product/product.data';
import { ShippingAddressData } from './checkout.data';

export interface OrderConfirmationData {
  firstName: string;
  email: string;
  product: ProductData;
  quantity: number;
  shippingAddress: ShippingAddressData;
}

export async function assertOrderConfirmation(page: Page, order: OrderConfirmationData) {
  await expect.soft(
    page.getByRole('heading', { name: `Thanks for your order, ${order.firstName}!`, level: 1, exact: true }),
  ).toBeVisible();
  await expect.soft(page.getByText(/^Order #\S+$/)).toBeVisible();

  await expect.soft(page.getByRole('heading', { name: order.product.name, level: 3, exact: true })).toBeVisible();
  await expect.soft(page.getByText(`Qty: ${order.quantity}`, { exact: true })).toBeVisible();

  await expect.soft(page.getByText('Visa ending in 4242', { exact: true })).toBeVisible();

  const { address, city, stateAbbreviation, zip } = order.shippingAddress;
  await expect.soft(page.getByText(address, { exact: true }).first()).toBeVisible();
  await expect.soft(page.getByText(`${city}, ${stateAbbreviation} ${zip}`, { exact: true }).first()).toBeVisible();

  await expect.soft(page.getByText(`Confirmation sent to ${order.email}`, { exact: true })).toBeVisible();
}
