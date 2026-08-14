import { Page, expect } from '@playwright/test';
import { OrderConfirmationData } from './checkout.data';
import { credentials } from '../../config/credentials';

export async function assertOrderConfirmation(page: Page, order: OrderConfirmationData) {
  const firstName = order.firstName ?? credentials.registeredUser.name!.split(' ')[0];
  const email = order.email ?? credentials.registeredUser.email;

  await expect.soft(
    page.getByRole('heading', { name: `Thanks for your order, ${firstName}!`, level: 1, exact: true }),
  ).toBeVisible();
  await expect.soft(page.getByText(/^Order #\S+$/)).toBeVisible();

  for (const item of order.items) {
    await expect.soft(page.getByRole('heading', { name: item.product.name, level: 3, exact: true })).toBeVisible();
    await expect.soft(page.getByText(`Qty: ${item.quantity}`, { exact: true })).toBeVisible();
  }

  await expect.soft(page.getByText('Visa ending in 4242', { exact: true })).toBeVisible();

  const { address, city, stateAbbreviation, zip } = order.shippingAddress;
  await expect.soft(page.getByText(address, { exact: true }).first()).toBeVisible();
  await expect.soft(page.getByText(`${city}, ${stateAbbreviation} ${zip}`, { exact: true }).first()).toBeVisible();

  await expect.soft(page.getByText(`Confirmation sent to ${email}`, { exact: true })).toBeVisible();
}
