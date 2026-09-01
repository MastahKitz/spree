import { Page } from '@playwright/test';
import { ShippingAddressData, CardData } from './checkout.data';

function stripeFrame(page: Page) {
  return page.frameLocator('iframe[title="Secure payment input frame"]');
}

export async function clickProceedToCheckoutLink(page: Page) {
  await page.getByRole('link', { name: 'Proceed to Checkout' }).click();
  await page.getByRole('heading', { name: 'Payment Method', level: 2 }).waitFor();
}

export async function selectUseDifferentShippingAddress(page: Page) {
  await page.getByRole('radio', { name: 'Use a different address' }).click();
}

export async function fillShippingAddress(page: Page, address: ShippingAddressData) {
  await page.getByRole('combobox', { name: 'Country', exact: true }).selectOption(address.country);
  await page.getByRole('textbox', { name: 'Address', exact: true }).fill(address.address);
  await page.getByRole('textbox', { name: 'City', exact: true }).fill(address.city);
  await page.getByRole('combobox', { name: 'State / Province', exact: true }).selectOption(address.state);
  await page.getByRole('textbox', { name: 'ZIP / Postal code', exact: true }).fill(address.zip);
  await page.getByRole('textbox', { name: 'Phone (optional)', exact: true }).fill(address.phone);
}

export async function fillCardDetails(page: Page, card: CardData) {
  const frame = stripeFrame(page);
  await frame.getByPlaceholder('1234 1234 1234 1234').fill(card.number);
  await frame.getByPlaceholder('MM / YY').fill(card.expiry);
  await frame.getByPlaceholder('CVC').fill(card.cvc);
  await frame.getByLabel('Country', { exact: true }).selectOption('United States');
  await frame.getByPlaceholder('12345').fill(card.zip);
}

export async function clickPayNowButton(page: Page) {
  await page.getByRole('button', { name: 'Pay Now' }).click();
  await page.getByRole('heading', { name: /^Thanks for your order,/ }).waitFor({ timeout: 30_000 });
}
