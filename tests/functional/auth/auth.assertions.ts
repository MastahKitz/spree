import { Page, expect } from '@playwright/test';

export async function assertLoginForm(page: Page) {
  await expect.soft(page.getByRole('main').getByText('My Account', { exact: true })).toBeVisible();
  await expect.soft(page.getByRole('textbox', { name: 'Email', exact: true })).toBeVisible();
  await expect.soft(page.getByRole('textbox', { name: 'Password', exact: true })).toBeVisible();
  await expect.soft(page.getByRole('button', { name: 'Sign In', exact: true })).toBeVisible();
}

export async function assertLoggedIn(page: Page, name: string, email: string) {
  await expect.soft(page.getByRole('heading', { name: 'Account Overview', exact: true })).toBeVisible();
  await expect.soft(page.getByText(name, { exact: true })).toBeVisible();
  await expect.soft(page.getByText(email, { exact: true })).toBeVisible();
  await expect.soft(page.getByRole('button', { name: 'Sign Out', exact: true })).toBeVisible();
}

export async function assertLoginError(page: Page) {
  await expect.soft(page.getByText(/invalid email or password/i)).toBeVisible();
}
