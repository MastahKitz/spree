import { Page } from '@playwright/test';

export async function openHomePage(page: Page) {
  await page.goto('/');
  await page.getByRole('banner').waitFor();
}

export async function clickAccountLink(page: Page) {
  await page.getByRole('banner').getByRole('link', { name: 'Account', exact: true }).click();
  await page.getByRole('main').getByText('My Account', { exact: true }).waitFor();
}

export async function enterEmail(page: Page, email: string) {
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
}

export async function enterPassword(page: Page, password: string) {
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
}

export async function clickSignInButton(page: Page) {
  await page.getByRole('button', { name: 'Sign In' }).click();
}

export async function clickSignOutButton(page: Page) {
  await page.getByRole('button', { name: 'Sign Out' }).click();
}
